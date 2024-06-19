import HTMLReactParser from "html-react-parser";
import ReactHtmlParser from 'react-html-parser';
const RemoveTag = ({ ParserText, className, setSeemore, seemore, ok }) => {
    
    const html = ParserText;
    const btn =  ok === 'show' ? <button>dfsdfsdfs</button> : "hide"
    return ReactHtmlParser(ParserText)
}
export default RemoveTag;
