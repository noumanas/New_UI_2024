import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../containers/home/home";
import LoginContainer from "../containers/login/login";
import NotFound from "../components/notfound/notfound";
import MyArtist from "../containers/my-artist/my-artist";
import SignupContainer from "../containers/signup/signup";
import ArtistSignupContainer from "../containers/artist/signup-artist/signup-artist";
import AddArtist from "../containers/artist/add-artist/add-artist";
import ViewArtist from "../containers/artist/view-artist/view-artist";
import EditArtist from "../containers/artist/edit-artist/edit-artist";
import BaseComponent from "../components/base-component/base-component";
import ResetPassword from "../containers/reset-password/ResetPassword";
import ViewFundingDashboard from "../containers/view-funding-dashboard/view-funding-dashboard";
import ProtectedRoute from "../protected-routes/protectedRoute";
import ProfilePage from "../containers/profile-page/profile-page";
import ForgotPassword from "../containers/forgot-password/ForgotPassword";
import ArtistAllTracks from "../components/artist-all-tracks/artist-all-tracks";
import UserListing from "../components/list-of-users/list-of-users";
import DocuSign from "../containers/docu-sign";
import Success from "../containers/success";
import MyContracts from "../containers/my-contracts/MyContracts";
import NewContract from "../containers/my-contracts/new-contract/NewContract";
import PreviewContract from "../containers/preview-contract/previewContract";
import PaymentPreview from "../containers/payment-preview/PaymentPreview";

import MyPayments from "../containers/my-payments/MyPayments";
import KYC from "../containers/kyc/KYC";

const Navigation = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <Routes>
      <Route path="/blig" element={<BaseComponent />}>
        <Route
          index
          path="home"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="my-artist"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <MyArtist />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="add-artist"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <AddArtist />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="view-artist/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <ViewArtist />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="view-artist/:id/users"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <UserListing />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="edit-artist/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <EditArtist />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="view-funding-dashboard/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <ViewFundingDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="profile"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="artist-tracks/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <ArtistAllTracks />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="docu-sign"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <DocuSign />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="contracts"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <MyContracts />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="kyc"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <KYC />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="NewContract"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <NewContract />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="contracts/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <PreviewContract />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="payment/:id"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <PaymentPreview />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="success"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          index
          path="payments"
          element={
            <ProtectedRoute isLoggedIn={user}>
              <MyPayments />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="/login" element={<LoginContainer />} />
      <Route path="/signup" element={<SignupContainer />} />
      <Route path="/artist-signup" element={<ArtistSignupContainer />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Navigate to="/blig/home" />} />
      <Route path="/blig" element={<Navigate to="/blig/home" />} />
    </Routes>
  );
};

export default Navigation;
