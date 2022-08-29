import styled from "styled-components";

const Wrapper = styled.div`
  padding: 20px;
  .refreshButton {
    cursor: pointer;
  }
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 17px;
  padding: 10px 0px;
  height: 100vh;
  .card {
    background: #eee;
    padding: 12px;
    cursor: pointer;
    h3 {
      font-size: 13px;
    }
  }
`;

export { Wrapper, Section };
