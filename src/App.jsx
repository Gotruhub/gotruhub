import { useState } from 'react'
import { createHashRouter, createRoutesFromElements, HashRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Contact from './pages/contact/Contact'
import About from './pages/about/About'
import Footer from './components/footer/Footer'
import Register from './pages/register/Register'
import RegisterOrgs from './pages/register-orgs/RegisterOrgs'
import RegisterPersonalBiz from './pages/register-personal-biz/RegisterPersonalBiz'
import RegisterGovernmentBiz from './pages/register-goverment-biz/RegisterGovernmentBiz'
import VerifyAccount from './pages/verifyAccount/VerifyAccount'
import CreatePassword from './pages/create-password/CreatePassword'
import Dashboard from './pages/dashboard/Dashboard'
import CreateUser from './pages/create-user/CreateUser'
import ResetPassword from './pages/reset-password/ResetPassword'
import ValidateToken from './pages/validate-token/ValidateToken'
import ChangePassword from './pages/change-password/ChangePassword'
import Subscribe from './pages/subscribe/Subscribe'
import SubSummary from './pages/sub-summary/SubSummary'
import Token from './pages/token/Token'
import SendToken from './pages/send-token/SendToken'
import ManageUsers from './pages/manage-users/ManageUsers'
import SingleUser from './pages/single-user/SingleUser'
import ProfileEdit from './pages/profile-edit/ProfileEdit'
import Wallet from './pages/wallet/Wallet'
import BankAccount from './pages/bank-account/BankAccount'
import UpdateBankAccount from './pages/update-bank-account/UpdateBankAccount'
import WalletRestriction from './pages/wallet-restriction/WalletRestriction'
import WithdrawalInfo from './pages/withdrawal-info/WithdrawalInfo'
import TransactionHistory from './pages/transaction-history/TransactionHistory'
import Orders from './pages/orders/Orders'
import SingleOrder from './pages/single-order/SingleOrder'
import Pass from './pages/pass/Pass'
import Location from './pages/location/Location'
import Settings from './pages/settings/Settings'
import Notification from './pages/notification/Notification'
import Calendar from './pages/calendar/Calendar'
import CreateSession from './pages/create-session/CreateSession'
import CreateSemester from './pages/create-semester/CreateSemester'
import Result from './pages/result/Result'
import SessionInfo from './pages/session-info/SessionInfo'
import ResultSemesterInfo from './pages/result-semester-info/ResultSemesterInfo'
import Units from './pages/units/Units'
import CreateUnit from './pages/create-unit/CreateUnit'
import CreateSubUnit from './pages/create-sub-unit/CreateSubUnit'
import SingleUnit from './pages/single-unit/SingleUnit'
import Assignments from './pages/assignments/Assignments'
import CreateAssignment from './pages/create-assignment/CreateAssignment'
import OrgzProfile from './pages/orgz-profile/OrgzProfile'
import Summary from './pages/summary/Summary'
import Grading from './pages/grading/Grading'
import StaffInfo from './pages/staff-info/StaffInfo'
import UnitAssignmentCreate from './pages/unit-assignment-create/UnitAssignmentCreate'
import UnitAssignmentSummary from './pages/unit-assignment-summary/UnitAssignmentSummary'
import AddSubUnitFromUnit from './pages/add-sub-unit-from-unit/AddSubUnitFromUnit'
import ViewSubUnit from './pages/view-sub-unit/ViewSubUnit'
import AddAssignmentFromSubUnit from './pages/add-assignment-from-sub-unit/AddAssignmentFromSubUnit'
import CoOrdinator from './pages/co-ordinator/CoOrdinator'
import Inventory from './pages/inventory/Inventory'
import NewProduct from './pages/new-product/NewProduct'
import NewProductInfo from './pages/new-product-info/NewProductInfo'
import TimeTable from './pages/timetable/TimeTable'
import AddSchedule from './pages/add-schedule/AddSchedule'
import SingleSemesterResultInfo from './pages/single-semester-result-info/SingleSemesterResultInfo'
import PrivacyPolicy from './pages/privacy-policy/PrivacyPolicy'
import BarCodeView from './pages/bar-code-view/BarCodeView'
import AttendanceSummary from './pages/attendance-summary/AttendanceSummary'
import EditTimeTable from './pages/edit-time-table/EditTimeTable'
import UpdateOrgs from './pages/update-orgs/UpdateOrgs'
import GuardianProfile from './pages/guardian-profile/GuardianProfile'
import EditGuardian from './pages/edit-guardian/EditGuardian'
import EditUnit from './pages/edit-unit/EditUnit'
import EditStaff from './pages/edit-staff/EditStaff'
import LostId from './pages/lost-id/LostId'
import StudentId from './pages/student-id/StudentId'
import GenerateId from './pages/generate-id/GenerateId'
import UpdateAuthorizedSignatures from './pages/update-authorized-signatures/UpdateAuthorizedSignatures'
import EditSemester from './pages/edit-semester/EditSemester'
import PaymentSuccessfull from './pages/payment-successful/PaymentSuccessfull'
import AssignmenntLocation from './pages/assignment-location/AssignmenntLocation'
import AddAssignmentLocation from './pages/add-assignnment-location/AddAssignmentLocation'
import EditAssignmentLocation from './pages/edit-assignment-location/EditAssignmentLocation'
import Category from './pages/category/Category'
import GradingSystem from './pages/grading-system/GradingSystem'
import AssignPickup from './pages/assign-pickup/AssignPickup'
import MemberProfile from './pages/member-profile/MemberProfile'
import NotificationInfo from './pages/notification-info/NotificationInfo'
import CreateUserImageCrop from './pages/create-user-image-crop/CreateUserImageCrop'
import TermsOfUse from './pages/terms-of-use/TermsOfUse'
import Referral from './pages/referral/Referral'
import AllUnitSummary from './pages/all-unit-summary/AllUnitSummary'
import Promotions from './pages/promotions/Promotions'
import SubUnitPromotions from './pages/sub-unit-promotions/SubUnitPromotions'
import PromoteStudents from './pages/promote-students/PromoteStudents'

function App() {

  // const baseUrl = 'https://test.yamltech.com'
  const baseUrl = 'https://go-tru-hub-api.onrender.com'
  const user = localStorage.getItem('user')

    return (
      <HashRouter>
        <Routes >
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />}/>
            <Route path='/contact-us' element={<Contact />}/>
            <Route path='/login' element={<Login baseUrl={baseUrl}/>} />
            <Route path='/register' element={<Register />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path='/terms-of-use' element={<TermsOfUse />} />
            <Route path='/register-organization' element={<RegisterOrgs baseUrl={baseUrl}/>}  />
            <Route path='/register-personal-biz' element={<RegisterPersonalBiz baseUrl={baseUrl}/>}/>
            <Route path='/regiser-government-biz' element={<RegisterGovernmentBiz baseUrl={baseUrl}/>} />
            <Route path='/verify-account' element={<VerifyAccount baseUrl={baseUrl}/>} />
            <Route path='/verify-token' element={<ValidateToken baseUrl={baseUrl}/>} />
            <Route path='/reset-password' element={<ResetPassword baseUrl={baseUrl}/>} />
            <Route path='/change-password' element={<ChangePassword baseUrl={baseUrl}/>} />
            <Route path='/create-password' element={<CreatePassword baseUrl={baseUrl}/>} />
            <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl}/>} />
            <Route path='/create-user' element={<CreateUser baseUrl={baseUrl}/>} />
            <Route path='/subscribe' element={<Subscribe baseUrl={baseUrl}/>} />
            <Route path='/sub-summary' element={<SubSummary baseUrl={baseUrl}/>} />
            <Route path='/token' element={<Token baseUrl={baseUrl}/>} />
            <Route path='/manage-users' element={<ManageUsers baseUrl={baseUrl}/>} />
            <Route path='/profile-edit/:id' element={<ProfileEdit baseUrl={baseUrl}/>} />
            <Route path='/send-token/:id' element={<SendToken baseUrl={baseUrl}/>} />
            <Route path='/user/:id' element={<SingleUser baseUrl={baseUrl}/>} />
            <Route path='/wallet' element={<Wallet baseUrl={baseUrl}/>} />
            <Route path='/wallet-restriction' element={<WalletRestriction baseUrl={baseUrl}/>} />
            <Route path='/bank-account' element={<BankAccount baseUrl={baseUrl}/>} />
            <Route path='/update-bank-account' element={<UpdateBankAccount baseUrl={baseUrl}/>} />
            <Route path='/withdrawal-info/:id' element={<WithdrawalInfo baseUrl={baseUrl}/>} />
            <Route path='/transaction-history' element={<TransactionHistory baseUrl={baseUrl}/>} />
            <Route path='/orders' element={<Orders baseUrl={baseUrl}/>} />
            <Route path='/order/:id' element={<SingleOrder baseUrl={baseUrl}/>} />
            <Route path='/pass' element={<Pass baseUrl={baseUrl}/>} />
            <Route path='/location' element={<Location baseUrl={baseUrl}/>} />
            <Route path='/settings' element={<Settings baseUrl={baseUrl}/>} />
            <Route path='/notification' element={<Notification baseUrl={baseUrl}/>} />
            <Route path='/notification/:id' element={<NotificationInfo baseUrl={baseUrl}/>} />
            <Route path='/calendar' element={<Calendar baseUrl={baseUrl}/>} />
            <Route path='/result' element={<Result baseUrl={baseUrl}/>} />
            <Route path='/create-session' element={<CreateSession baseUrl={baseUrl}/>} />
            <Route path='/create-semester/:session' element={<CreateSemester baseUrl={baseUrl}/>} />
            <Route path='/session-info/:session' element={<SessionInfo baseUrl={baseUrl}/>} />
            <Route path='/semester-result-info/:session' element={<ResultSemesterInfo baseUrl={baseUrl}/>} />
            <Route path='/units' element={<Units baseUrl={baseUrl}/>} />
            <Route path='/create-unit' element={<CreateUnit baseUrl={baseUrl}/>} />
            <Route path='/create-sub-unit' element={<CreateSubUnit baseUrl={baseUrl}/>} />
            <Route path='/unit/:id' element={<SingleUnit baseUrl={baseUrl}/>} />
            <Route path='/unit-assignment-create/:id' element={<UnitAssignmentCreate baseUrl={baseUrl}/>} />
            <Route path='/sub-unit-assignment-create/:id' element={<AddAssignmentFromSubUnit baseUrl={baseUrl}/>} />
            <Route path='/assignments' element={<Assignments baseUrl={baseUrl}/>} />
            <Route path='/create-assignment' element={<CreateAssignment baseUrl={baseUrl}/>} />
            <Route path='/orgz-profile' element={<OrgzProfile baseUrl={baseUrl}/>} />
            <Route path='/attendance-summary/:id' element={<AttendanceSummary baseUrl={baseUrl}/>} />
            <Route path='/summary-display' element={<Summary baseUrl={baseUrl}/>} />
            <Route path='/grading-system' element={<GradingSystem baseUrl={baseUrl}/>} />
            <Route path='/co-ordinator/:id' element={<CoOrdinator baseUrl={baseUrl}/>} />
            <Route path='/view-assignment-summary' element={<UnitAssignmentSummary baseUrl={baseUrl}/>} />
            <Route path='/staff/:id' element={<EditStaff baseUrl={baseUrl}/>} />
            <Route path='/add-sub-unit/:id' element={<AddSubUnitFromUnit baseUrl={baseUrl}/>} />
            <Route path='/view-sub-unit/:id' element={<ViewSubUnit baseUrl={baseUrl}/>} />
            <Route path='/inventory' element={<Inventory baseUrl={baseUrl}/>} />
            <Route path='/new-product' element={<NewProduct baseUrl={baseUrl}/>} />
            <Route path='/referral' element={<Referral baseUrl={baseUrl}/>} />
            <Route path='/product-info/:id' element={<NewProductInfo baseUrl={baseUrl}/>} />
            <Route path='/time-table/:id' element={<TimeTable baseUrl={baseUrl}/>} />
            <Route path='/create-schedule/:id' element={<AddSchedule baseUrl={baseUrl}/>}/>
            <Route path='/edit-schedule/:subUnitId/:scheduleId' element={<EditTimeTable baseUrl={baseUrl}/>}/>
            <Route path='/class-schedule-info/:id' element={<BarCodeView baseUrl={baseUrl}/>}/>
            <Route path='/single-semester-result-info/:session/:semester' element={<SingleSemesterResultInfo baseUrl={baseUrl}/>}/>
            <Route path='/update-orgs' element={<UpdateOrgs baseUrl={baseUrl}/>} />
            <Route path='/guardian-profile/:id' element={<GuardianProfile baseUrl={baseUrl}/>} />
            <Route path='/edit-guardian/:id' element={<EditGuardian baseUrl={baseUrl}/>} />
            <Route path="/edit-unit/:id" element={<EditUnit baseUrl={baseUrl}/>} />
            <Route path="/recover-id" element={<LostId baseUrl={baseUrl}/>} />
            <Route path="/student-id/:id" element={<StudentId baseUrl={baseUrl}/>} />
            <Route path="/generate-id" element={<GenerateId baseUrl={baseUrl}/>} />
            <Route path="/update-authorized-images/:id" element={<UpdateAuthorizedSignatures baseUrl={baseUrl}/>} />
            <Route path="/update-semester/:id" element={<EditSemester baseUrl={baseUrl}/>} />
            <Route path="/payment-successfull" element={<PaymentSuccessfull baseUrl={baseUrl}/>} />
            <Route path="/assignment-location" element={<AssignmenntLocation baseUrl={baseUrl}/>} />
            <Route path="/add-assignment-location" element={<AddAssignmentLocation baseUrl={baseUrl}/>} />
            <Route path="/edit-assignment-location/:id" element={<EditAssignmentLocation baseUrl={baseUrl}/>} />
            <Route path="/categories" element={<Category baseUrl={baseUrl}/>} />
            <Route path="/assign-pickup" element={<AssignPickup baseUrl={baseUrl}/>} />
            <Route path="/member-profile/:id" element={<MemberProfile baseUrl={baseUrl}/>} />
            <Route path="/create-user-image-crop" element={<CreateUserImageCrop baseUrl={baseUrl}/>} />
            <Route path="/all-attendance-summary" element={<AllUnitSummary baseUrl={baseUrl}/>} />
            <Route path="/promotion" element={<Promotions baseUrl={baseUrl}/>} />
            <Route path="/promotion/:subUnitId/:sessionId" element={<SubUnitPromotions baseUrl={baseUrl}/>} />
            <Route path="/promote-student" element={<PromoteStudents baseUrl={baseUrl}/>} />
            <Route path='*' element={<div>404</div>} />
        </Routes>
      </HashRouter>
  )
}

export default App