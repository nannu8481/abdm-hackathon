import styled from "styled-components";

const Wrapper = styled.div`
  justify-content: center;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  input {
    width: 223px;
    height: 31px;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
  }
  .formInfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .inputBox select {
    width: 223px;
    height: 31px;
    border: none;
    border-radius: 5px;
  }
  form,
  .otpWrapper {
    border: 2px solid #7fb77e;
    display: flex;
    flex-direction: column;
    padding: 80px 60px;
    background: #eee;
    border-radius: 8px;
    align-items: center;
    gap: 35px;
  }
  .button {
    background: #f1f1f1;
    color: #7fb77e;
    border: 1px solid #7fb77e;
    width: 91px;
    height: 38px;
    font-size: 16px;
    border-radius: 13px;
    margin-top: 14px;
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
    }
    :hover {
      background: #7fb77e;
      color: #f1f1f1;
    }
  }
  .DonateBlood {
    background: #f1f1f1;
    color: #7fb77e;
    border: 1px solid #7fb77e;
    height: 38px;
    font-size: 16px;
    border-radius: 13px;
    margin-top: 14px;
    display: flex;
    align-items: center;
    padding: 0 13px;
    :hover {
      background: #7fb77e;
      color: #f1f1f1;
    }
  }
  .text {
    margin: 0;
    font-size: 35px;
    font-weight: 600;
  }
  .inputBox {
    margin: 15px 0;
    select {
      width: 223px;
      height: 31px;
    }
  }
  .title {
    text-align: left;
    margin: 0;
    padding-left: 7px;
    padding-bottom: 5px;
    font-size: 15px;
  }
  .bloodDonorText {
    padding-right: 25px;
  }
  .relativeBloodGroup {
    display: flex;
    h5 {
      margin: 0;
      align-self: center;
      font-size: 22px;
      padding-right: 18px;
    }
    span {
      font-size: 43px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;
export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px;
  .heading {
    padding: 10px 0;
  }
`;
const OtpWrapper = styled.div`
  input {
    width: 2em !important;
    border: 1px solid #7fb77e;
  }
`;

export { Wrapper, OtpWrapper };
