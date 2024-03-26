import React, {useCallback, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilLockLocked, cilUser} from '@coreui/icons';
import {authMessage, signUpUserAsync} from 'src/services/auth/authSlice';
import ToastDialog from "../../../components/ToastDialog";
import {useAlertContext} from "../../../providers/alertContext";

const Register = () => {
  const dispatch = useDispatch();
  const {setMessage, setAlertVisible} = useAlertContext();
  const authStatusMsg = useSelector(authMessage);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfm, setCfm] = useState("");

  useEffect(() => {
    if (authStatusMsg) {
      setMessage(authStatusMsg);
      setAlertVisible(true);
    }
  }, [authStatusMsg]);

  const createAccount = useCallback(() => {
    dispatch(signUpUserAsync({name, email, password}));
  }, [name, dispatch, email, password, cfm]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center position-relative">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-medium-emphasis">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser}/>
                    </CInputGroupText>
                    <CFormInput placeholder="Username" autoComplete="username" value={name}
                                onChange={(e) => setName(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked}/>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked}/>
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={cfm}
                      onChange={(e) => setCfm(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={createAccount}>Create Account</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
      <ToastDialog/>
    </div>
  )
}

export default Register
