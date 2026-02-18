import React, { useEffect, useRef, useState } from 'react';
import TopNav from '../../components/top-nav/TopNav';
import SideNav from '../../components/side-nav/SideNav';
import { useNavigate, useParams } from 'react-router-dom';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import Alert from '../../components/alert/Alert';
import { IoCloseOutline } from 'react-icons/io5';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const UpdateAuthorizedSignatures = ({ baseUrl }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem('user'));

  const [guardian, setGuardian] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const [relationImage, setRelationImage] = useState();
  const [signatureImage, setSignatureImage] = useState();

  const [msg, setMsg] = useState('');
  const [alertType, setAlertType] = useState();
  const [loading, setLoading] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [fileUploadLoader, setfileUploadLoader] = useState(false);
  const [toggleNav, setToggleNav] = useState(false);

  // ✅ Crop modal state (shared, with a mode for which image we are editing)
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [activeUploadType, setActiveUploadType] = useState(null); // 'relation' | 'signature'
  const [imgSrc, setImgSrc] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  async function getUserInfo() {
    const res = await fetch(`${baseUrl}/users/get-user/${id}`, {
      headers: {
        Authorization: `Bearer ${user.data.access_token}`,
      },
    });
    const data = await res.json();
    setGuardian(data.data.user);

    // these can be ids with file object or full object (based on your API)
    setSignatureImage(data.data.user.guardians.signature);
    setRelationImage(data.data.user.guardians.relationImage);
  }

  function openCropModal(type) {
    setActiveUploadType(type); // relation or signature
    setImagePreviewModal(true);
    setImgSrc('');
    setPreviewUrl(null);
    setCrop(undefined);
    setCompletedCrop(null);
  }

  function closeCropModal() {
    setImagePreviewModal(false);
    setActiveUploadType(null);
    setImgSrc('');
    setPreviewUrl(null);
    setCrop(undefined);
    setCompletedCrop(null);
  }

  function handleImagePreviewAndCroping(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imgUrl = reader.result?.toString() || '';
      setImgSrc(imgUrl);
    });
    reader.readAsDataURL(file);
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropingWidthPercent = (150 / width) * 100;

    const c = makeAspectCrop(
      {
        unit: '%',
        x: 25,
        y: 25,
        width: cropingWidthPercent,
        height: 50,
      },
      1,
      width,
      height
    );

    const centered = centerCrop(c, width, height);
    setCrop(centered);
  };

  const getCroppedImage = () => {
    if (!completedCrop || !imgRef.current) return null;

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width;
    canvas.height = completedCrop.height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      completedCrop.width,
      completedCrop.height
    );

    return canvas.toDataURL('image/jpeg');
  };

  const handlePreview = () => {
    const croppedImage = getCroppedImage();
    if (croppedImage) setPreviewUrl(croppedImage);
  };

  function base64ToFile(base64String, fileName) {
    const [metadata, base64Data] = base64String.split(',');
    const contentType = metadata.match(/:(.*?);/)?.[1] || 'image/jpeg';

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length)
      .fill(0)
      .map((_, i) => byteCharacters.charCodeAt(i));
    const byteArray = new Uint8Array(byteNumbers);

    const newFile = new File([byteArray], fileName, { type: contentType });

    if (activeUploadType === 'relation') {
      handleRelationUpload(newFile);
    } else if (activeUploadType === 'signature') {
      handleSignatureUpload(newFile);
    }
  }

  async function handleRelationUpload(file) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSizeInBytes) {
      setMsg('File size should not exceed 5MB');
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }


    setfileUploadLoader(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${baseUrl}/upload-media`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res) setfileUploadLoader(false);

    if (res.ok) {
      setMsg('File uploaded successfully');
      setAlertType('success');
      setAlertTitle('Success');
      setRelationImage(data.data);
      closeCropModal();
    } else {
      setMsg("File upload wasn't successfull");
      setAlertType('error');
      setAlertTitle('Failed');
    }



    setImagePreviewModal(false);
    setPreviewUrl(null);
    setImgSrc('');
  }

  async function handleSignatureUpload(file) {
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSizeInBytes) {
      setMsg('File size should not exceed 5MB');
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }

    setfileUploadLoader(true);

    const formData = new FormData();
    formData.append('file', file);

    const res = await fetch(`${baseUrl}/upload-media`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (res) setfileUploadLoader(false);

    if (res.ok) {
      setMsg('File uploaded successfully');
      setAlertType('success');
      setAlertTitle('Success');
      setSignatureImage(data.data);
      closeCropModal();
    } else {
      setMsg("File upload wasn't successfull");
      setAlertType('error');
      setAlertTitle('Failed');
    }


    setImagePreviewModal(false);
    setPreviewUrl(null);
    setImgSrc('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!guardian?.guardians?._id) {
      setMsg('Guardian data not loaded');
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }

    if (!relationImage?._id || !signatureImage?._id) {
      setMsg('Please upload both relation image and signature image.');
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }

    setLoading(true);

    const res = await fetch(`${baseUrl}/users/get-user/${guardian.guardians._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.data.access_token}`,
      },
      body: JSON.stringify({
        fullName: guardian.guardians.fullName,
        role: 'guardian',
        children: guardian.guardians.children,
        profileImage: guardian.guardians.profileImage._id,
        relationImage: relationImage._id,
        signature: signatureImage._id,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMsg("Guardian's data updated successfully");
      setAlertType('success');
      setAlertTitle('Success');
    } else {
      setMsg("Failed to update guardian's data");
      setAlertType('error');
      setAlertTitle('Failed');
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <div className="w-full lg:w-[78%] ml-auto pb-5">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} baseUrl={baseUrl} />

        <div className="">
          <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem]">
            <div>
              <div className="flex items-center gap-2">
                <img src="./images/arrow-left.svg" alt="" onClick={() => navigate('/manage-users')} className="cursor-pointer" />
                <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">
                  Update Authorised Person&apos;s image and signature
                </p>
              </div>
            </div>
          </div>

          <div className="flex item-center justify-center flex-col lg:flex-row w-[90%] lg:w-[80%] mx-auto gap-8">
            {/* ✅ Relation Image Box (click opens crop modal, no change button) */}
            <div className="xl:w-[1200px] flex items-center justify-center flex-col">
              <label className="block mb-2 text-left text-text-color">Relation image</label>

              <div
                onClick={() => openCropModal('relation')}
                className="border border-dashed p-3 rounded max-w-[500px] cursor-pointer w-full"
              >
                <img
                  src={
                    relationImage?.file
                      ? relationImage.file
                      : guardian?.guardians?.relationImage?.file
                  }
                  className="w-full"
                  alt=""
                />
              </div>

              <p className="text-[12px] text-gray-500 mt-3">Click the image to change</p>
            </div>

            {/* ✅ Signature Image Box (click opens crop modal, no change button) */}
            <div className="xl:w-[1200px] flex items-center justify-center flex-col">
              <label className="block mb-2 text-left text-text-color">Signature image</label>

              <div
                onClick={() => openCropModal('signature')}
                className="border border-dashed p-3 rounded max-w-[500px] cursor-pointer w-full"
              >
                <img
                  src={
                    signatureImage?.file
                      ? signatureImage.file
                      : guardian?.guardians?.signature?.file
                  }
                  className="w-full"
                  alt=""
                />
              </div>

              <p className="text-[12px] text-gray-500 mt-3">Click the image to change</p>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6 px-[30px]">
            <button onClick={() => navigate(`/user/${id}`)} type="button" className="px-4 py-2 text-black bg-white border border-black rounded">
              Back
            </button>

            {loading ? (
              <BtnLoader bgColor="#191f1c" />
            ) : (
              <button type="submit" className="px-4 py-2 text-white rounded bg-primary-color" onClick={handleSubmit}>
                Save changes
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Upload loader overlay */}
      {fileUploadLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <img src="./images/loader.gif" className="w-10" />
        </div>
      )}

      {/* ✅ Crop modal (re-used for both relation/signature) */}
      {imagePreviewModal && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            left: '0',
            top: '0',
            zIndex: '999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'rgba(18, 18, 18, 0.8)',
          }}
        >
          <div className="bg-white md:w-[50%] w-[90%] text-center flex items-center justify-center flex-col py-10 relative" style={{ borderRadius: '10px' }}>
            <p
              className="absolute right-[-10px] bg-gray-300 top-[-18px] cursor-pointer text-[22px] z-[999999] p-[5px] border rounded-full"
              onClick={closeCropModal}
            >
              <IoCloseOutline />
            </p>

            {imgSrc ? (
              <div>
                {previewUrl ? (
                  <div>
                    <img src={previewUrl} alt="" className="h-[300px] object-contain mx-auto" />
                    <div className="flex flex-col items-center justify-center w-full gap-5 mt-5 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => setPreviewUrl(null)}
                        className="text-primary-color border border-primary-color rounded-[4px] px-[28px] py-[10px] text-center mx-auto"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => base64ToFile(previewUrl, 'Image')}
                        className="text-white bg-primary-color rounded-[4px] px-[28px] py-[10px] text-center mx-auto"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <ReactCrop
                      crop={crop}
                      aspect={1}
                      minWidth={150}
                      onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      keepSelection
                    >
                      <img ref={imgRef} src={imgSrc} onLoad={onImageLoad} className="h-[300px] object-contain mx-auto" alt="" />
                    </ReactCrop>

                    <div className="flex flex-col items-center justify-center w-full gap-5 mt-5 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setImgSrc('');
                          setPreviewUrl(null);
                          setCrop(undefined);
                          setCompletedCrop(null);
                        }}
                        className="text-primary-color border border-primary-color rounded-[4px] px-[28px] py-[10px] text-center mx-auto"
                      >
                        Delete Image
                      </button>
                      <button
                        type="button"
                        onClick={handlePreview}
                        className="text-white bg-primary-color rounded-[4px] px-[28px] py-[10px] text-center mx-auto"
                      >
                        Preview Image
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <>
                <img src="./images/file-upload.svg" alt="" />
                <p className="text-text-color font-[600] mt-5">
                  Click to upload <span className="font-[400] text-[#475367] hidden">or drag and drop</span>
                </p>
                <p className="text-[#98A2B3]">PNG, JPG (max. 5mb)</p>
                <div className="flex items-center gap-[15px] w-full mt-5">
                  <div className="w-[35%] ml-auto h-[2px] bg-[#F0F2F5]"></div>
                  <p>OR</p>
                  <div className="w-[35%] mr-auto h-[2px] bg-[#F0F2F5]"></div>
                </div>

                <input
                  onChange={(e) => handleImagePreviewAndCroping(e.target.files?.[0])}
                  type="file"
                  className="z-[1] cursor-pointer absolute opacity-0 h-full outline-none w-full rounded-[4px] bg-transparent text-[14px]"
                />
                <button type="button" className="text-white bg-primary-color rounded-[4px] mt-[2.5rem] px-[28px] py-[10px] text-center mx-auto">
                  Browse Files
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {msg && <Alert msg={msg} setMsg={setMsg} alertType={alertType} />}
    </div>
  );
};

export default UpdateAuthorizedSignatures;
