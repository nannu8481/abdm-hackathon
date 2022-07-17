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
  }

  form,
  .otpWrapper {
    border: 2px solid;
    padding: 100px 60px;
    background: #eee;
  }
  .button {
    background: #000;
    color: #fff;
    border: none;
    width: 91px;
    height: 38px;
    font-size: 16px;
    border-radius: 13px;
    margin-top: 14px;
    cursor: pointer;
    &.disabled {
      opacity: 0.5;
    }
  }
  .text {
    margin-top: 0;
    font-size: 15px;
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
  }
  .bloodDonorText {
    padding-right: 25px;
  }
  .relativeBloodGroup {
    display: flex;
    h5 {
      margin: 0;
      align-self: center;
      font-size: 15px;
      padding-right: 18px;
    }
    span {
      font-size: 43px;
      font-weight: bold;
      cursor: pointer;
    }
  }
`;

const OtpWrapper = styled.div`
  input {
    width: 2em !important;
  }
`;

export { Wrapper, OtpWrapper };
