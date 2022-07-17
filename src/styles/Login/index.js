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
  button {
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
`;

export { Wrapper };
