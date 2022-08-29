import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #7fb77e;
`;
export const Logo = styled.img`
  height: 80px;
  padding: 0px 15px;
`;
const Text = styled.h3`
  font-size: 22px;
  margin: 0;
  font-weight: bolder;
  padding: 12px;
  letter-spacing: 0.25px;
  text-align: center;
  color: #fff;
`;

export { Wrapper, Text };
