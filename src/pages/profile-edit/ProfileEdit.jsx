import React, { useEffect, useRef, useState } from 'react';
import SideNav from '../../components/side-nav/SideNav';
import TopNav from '../../components/top-nav/TopNav';
import { useNavigate, useParams } from 'react-router-dom';
import { IoChevronDownOutline, IoCloseOutline } from 'react-icons/io5';
import BtnLoader from '../../components/btn-loader/BtnLoader';
import AlertModal from '../../components/alert-modals/AlertModal';

import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ProfileEdit = ({ baseUrl }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('user'));

  const [userProfile, setUserProfile] = useState();
  const [dropDown, setDropDown] = useState(false);

  const [selectedUnit, setSelectedUnit] = useState('');
  const [allUnits, setAllUnits] = useState([]);
  const [allSubUnits, setAllSubUnits] = useState();
  const [selectedSubUnit, setSelectedSubUnit] = useState('');
  const [allAssignments, setAllAssignments] = useState([]);

  const [profileImage, setProfileImage] = useState();

  const [msg, setMsg] = useState('');
  const [alertType, setAlertType] = useState();
  const [alertTitle, setAlertTitle] = useState('');

  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [fileUploadLoader, setfileUploadLoader] = useState(false);
  const [regNum, setRegNum] = useState('');
  const [guardians, setGuardians] = useState([]);
  const [toggleNav, setToggleNav] = useState(false);

  // Crop states
  const [imagePreviewModal, setImagePreviewModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    getAllUnits();
    getAllAssignments();
  }, []);

  async function getAllUnits() {
    const res = await fetch(`${baseUrl}/units`, {
      headers: { Authorization: `Bearer ${user.data.access_token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.message);
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }
    setAllUnits(data.data.units);
  }

  async function getSubUnitInfo(id) {
    const res = await fetch(`${baseUrl}/unit/${id}/subunits`, {
      headers: { Authorization: `Bearer ${user.data.access_token}` },
    });
    const data = await res.json();
    if (!res.ok) {
      setMsg(data.message);
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }
    setAllSubUnits(data.data.units);
  }

  async function getAllAssignments() {
    const res = await fetch(`${baseUrl}/course`, {
      headers: { Authorization: `Bearer ${user.data.access_token}` },
    });
    const data = await res.json();
    if (res.ok) setAllAssignments(data.data);
  }

  async function getUserInfo() {
    const res = await fetch(`${baseUrl}/users/get-user/${id}`, {
      headers: { Authorization: `Bearer ${user.data.access_token}` },
    });
    const data = await res.json();

    setUserProfile(data?.data);
    setFullName(data?.data?.user?.fullName);
    setSelectedUnit(data?.data?.user?.piviotUnit);
    setSelectedSubUnit(data?.data?.user?.subUnit);
    setProfileImage(data?.data?.user?.profileImage);
    setRegNum(data?.data?.user?.regNum);
    setGuardians(data?.data?.user?.guardians?._id);

    if (data?.data?.user?.piviotUnit?._id) {
      getSubUnitInfo(data.data.user.piviotUnit._id);
    }
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  function handleImagePreviewAndCroping(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImgSrc(reader.result.toString());
    reader.readAsDataURL(file);
  }

  const onImageLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthPercent = (150 / width) * 100;

    const crop = makeAspectCrop(
      { unit: '%', x: 25, y: 25, width: cropWidthPercent, height: 50 },
      1,
      width,
      height
    );

    setCrop(centerCrop(crop, width, height));
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

  function base64ToFile(base64, name) {
    const [meta, data] = base64.split(',');
    const type = meta.match(/:(.*?);/)[1];

    const binary = atob(data);
    const arr = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) arr[i] = binary.charCodeAt(i);

    handleFileUpload(new File([arr], name, { type }));
  }

  async function handleFileUpload(file) {
    if (file.size > 5 * 1024 * 1024) {
      setMsg('File must be under 5MB');
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
    setfileUploadLoader(false);

    if (!res.ok) {
      setMsg('Upload failed');
      setAlertType('error');
      setAlertTitle('Failed');
      return;
    }

    setProfileImage(data.data);
    setMsg('Image uploaded successfully');
    setAlertType('success');
    setAlertTitle('Success');

    setImagePreviewModal(false);
    setPreviewUrl(null);
    setImgSrc('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${baseUrl}/users/get-user/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.data.access_token}`,
      },
      body: JSON.stringify({
        fullName,
        subUnit: selectedSubUnit?._id,
        role: 'student',
        guardians,
        profileImage: profileImage?._id,
        piviotUnit: selectedUnit?._id,
      }),
    });

    const data = await res.json();
    setLoading(false);

    setMsg(data.message);
    setAlertType(res.ok ? 'success' : 'error');
    setAlertTitle(res.ok ? 'Success' : 'Failed');
  };

  return (
    <div>
      <SideNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
      <div className="w-full lg:w-[78%] bg-[#F2FCF7] ml-auto">
        <TopNav toggleNav={toggleNav} setToggleNav={setToggleNav} />
        <div className="flex flex-col items-center justify-center pb-[6rem] bg-gray-100">
          <div className="flex justify-between items-start mb-[3rem] bg-[#F2FCF7] px-[30px] py-[1rem] w-full">
            <div className="flex items-center gap-2">
              <img
                src="./images/arrow-left.svg"
                alt=""
                onClick={() => navigate(`/user/${id}`)}
                className="cursor-pointer"
              />
              <p className="text-[20px] lg:text-[28px] text-primary-color font-[600]">
                Edit Student Profile
              </p>
            </div>
          </div>

          <form
            className="w-full max-w-2xl p-6 mb-8 bg-white rounded-lg shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label className="block text-gray-700">Member full name</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full p-2 mt-1 border rounded"
              />
            </div>

            {/* IMAGE BOX */}
            <div className="mt-7">
              <label className="block mb-2 text-left text-text-color">
                User's image
              </label>

              <div
                onClick={() => setImagePreviewModal(true)}
                className="relative flex items-center justify-center flex-col rounded-[16px] h-[300px] w-full cursor-pointer"
                style={{ border: '1.5px dashed #D0D5DD' }}
              >
                {profileImage?.file ? (
                  <img
                    src={profileImage.file}
                    alt=""
                    className="absolute h-[250px]"
                  />
                ) : (
                  <>
                    <img src="./images/file-upload.svg" alt="" />
                    <p className="mt-5 font-[600]">Click to upload</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate(`/user/${id}`)}
                className="px-4 py-2 text-black bg-white border border-black rounded"
              >
                Back
              </button>

              {loading ? (
                <BtnLoader bgColor="#191f1c" />
              ) : (
                <button className="px-4 py-2 text-white rounded bg-primary-color">
                  Save changes
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* CROP MODAL */}
      {imagePreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white md:w-[50%] w-[90%] text-center flex items-center justify-center flex-col py-10 relative rounded-xl">
            <p
              className="absolute right-[-10px] top-[-18px] bg-gray-300 p-2 rounded-full cursor-pointer"
              onClick={() => setImagePreviewModal(false)}
            >
              <IoCloseOutline />
            </p>

            {imgSrc ? (
              previewUrl ? (
                <>
                  <img src={previewUrl} className="h-[300px] mx-auto" />

                  <div className="flex justify-center gap-4 mt-5">
                    <button
                      onClick={() => setPreviewUrl(null)}
                      className="px-6 py-2 border"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => base64ToFile(previewUrl, 'image')}
                      className="px-6 py-2 text-white bg-primary-color"
                    >
                      Upload
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <ReactCrop
                    crop={crop}
                    aspect={1}
                    onChange={(c, p) => setCrop(p)}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      onLoad={onImageLoad}
                      className="h-[300px] mx-auto"
                    />
                  </ReactCrop>

                  <div className="flex justify-center gap-4 mt-5">
                    <button
                      onClick={() => setImgSrc(null)}
                      className="px-6 py-2 border"
                    >
                      Delete
                    </button>
                    <button
                      onClick={handlePreview}
                      className="px-6 py-2 text-white bg-primary-color"
                    >
                      Preview
                    </button>
                  </div>
                </>
              )
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

      {msg && (
        <AlertModal
          msg={msg}
          alertType={alertType}
          setMsg={setMsg}
          alertTitle={alertTitle}
        />
      )}

      {fileUploadLoader && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <img src="./images/loader.gif" className="w-10" />
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
