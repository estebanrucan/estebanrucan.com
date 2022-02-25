import { StyledBadgeCheck, StyledSkillsData, StyledSkillsLevel, StyledSkillsName } from "./styles";


function SkillsData({name, level}) {
  return ( 
    <StyledSkillsData>
      <StyledBadgeCheck />      

      <div>
        <StyledSkillsName>{name}</StyledSkillsName>
        <StyledSkillsLevel>{level}</StyledSkillsLevel>
      </div>
    </StyledSkillsData>
  );
}

export default SkillsData;