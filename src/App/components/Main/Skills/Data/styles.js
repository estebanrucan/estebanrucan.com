import styled from "styled-components";
import { BsPatchCheckFill } from "react-icons/bs";

const StyledSkillsData = styled.div`
  display: flex;
  column-gap: .5rem;
`;

const StyledBadgeCheck = styled(BsPatchCheckFill)`
  font-size: 1rem;
  color: var(--first-color);
`;

const StyledSkillsName = styled.h3`
  font-size: var(--normal-font-size);
  font-weight: var(--font-medium);
  line-height: 18px;
`;

const StyledSkillsLevel = styled.span`
  font-size: var(--tiny-font-size);
`;

export {
  StyledSkillsData,
  StyledBadgeCheck,
  StyledSkillsName,
  StyledSkillsLevel,
};
