import HTMLReactParser from "html-react-parser";

const RemoveTag = ({ ParserText, className }) => {
    const html = ParserText;
    return HTMLReactParser(`<div className={className}>${html}</div>`)
}
export default RemoveTag;