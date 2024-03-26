import React, {useCallback, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {cilLockLocked, cilUser} from '@coreui/icons'

import {useDispatch, useSelector} from 'react-redux';
import {signInUserAsync} from 'src/services/auth/authSlice';
import ToastDialog from "../../../components/ToastDialog";
import {useAlertContext} from "../../../providers/alertContext";
import {authMessage} from "../../../services/auth/authSlice";

const Login = () => {
  const {setMessage, setAlertVisible} = useAlertContext();
  const authStatusMsg = useSelector(authMessage);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();

  useEffect(() => {
    if (authStatusMsg) {
      setMessage(authStatusMsg);
      setAlertVisible(true);
    }
  }, [authStatusMsg]);

  const signinUser = useCallback(() => {
    dispatch(signInUserAsync({email, password}))
  }, [email, password, dispatch]);

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center position-relative">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser}/>
                      </CInputGroupText>
                      <CFormInput placeholder="User Email" autoComplete="username" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked}/>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" onClick={signinUser}>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{width: '44%'}}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
      <ToastDialog/>
    </div>
  )
}

export default Login
