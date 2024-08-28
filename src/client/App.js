"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const App = () => {
    return (react_1.default.createElement("div", { style: { textAlign: 'center', padding: '50px' } },
        react_1.default.createElement("h1", null, "Welcome to My React App"),
        react_1.default.createElement("p", null, "This is a simple React application using TypeScript."),
        react_1.default.createElement("button", { onClick: () => alert('Hello, world!') }, "Click Me!")));
};
exports.default = App;
