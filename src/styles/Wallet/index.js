import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  > img {
    width: 50%;
  }
`;

const Section = styled.div`
  h3 {
    text-align: center;
    font-size: 36px;
    width: 100%;
    position: absolute;
  }
`;

const GoogleContainer = styled.div`
  .goog-te-combo {
    border: none;
    width: 100%;
    outline: none;
    text-align: center;
    color: #363b97;
    font-family: "poppinssemibold";
  }

  .goog-te-gadget .goog-te-combo {
    margin-top: 20px;
  }
`;

export { Wrapper, Section, GoogleContainer };
