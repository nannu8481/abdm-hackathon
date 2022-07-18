import styled from "styled-components";

const Wrapper = styled.div`
  .refreshButton {
    cursor: pointer;
  }
`;

const Section = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 17px;
  padding: 10px 20px;
  .card {
    background: #eee;
    padding: 12px;
    h3 {
      font-size: 13px;
    }
  }
`;

export { Wrapper, Section };
