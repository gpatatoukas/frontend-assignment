import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

//fix for react-leaflet jest testing errors
var createElementNSOrig = global.document.createElementNS
global.document.createElementNS = function(namespaceURI, qualifiedName) {
  if (namespaceURI==='http://www.w3.org/2000/svg' && qualifiedName==='svg'){
    var element = createElementNSOrig.apply(this,arguments)
    element.createSVGRect = function(){}; 
    return element;
  }
  return createElementNSOrig.apply(this,arguments)
}