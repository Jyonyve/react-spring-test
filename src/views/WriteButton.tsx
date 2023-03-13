import { StyledButton } from "../component/importedViewComponent/AppButton";
import { adminChecker } from "../component/Rolechecker";

export default function WriteButton(boardKind :any, renderWriting: boolean, setRenderWriting:any){
    if(adminChecker()){
      return(
      <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
          Write
      </StyledButton>
      )
    } else {
      switch(boardKind){
        case 'NOTICEBOARD' :
          return;
        case 'SOCIALBOARD' :
          return(
            <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
                Write
            </StyledButton>
            )
        case 'QNABOARD' : 
          return(
            <StyledButton variant="text" onClick={() => renderWriting===true ? setRenderWriting(false) : setRenderWriting(true)}>          
                Write
            </StyledButton>
            )
        case 'FAQBOARD':
          return;
        default :
          break;
      }
    }

    
  }
