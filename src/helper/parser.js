import * as Parser from "xml-js";

// const xmlToJS = (xml: string): object => {
//   return Parser.xml2js(xml, { compact: true });
// };

const xmlToJS = (xml) => {
  return Parser.xml2js(xml, { compact: true });
};

export { xmlToJS };
