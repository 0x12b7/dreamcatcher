"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/mod.bun.ts
var mod_bun_exports = {};
__export(mod_bun_exports, {
  Compiler: () => Compiler,
  EthereumVirtualMachine: () => EthereumVirtualMachine
});
module.exports = __toCommonJS(mod_bun_exports);

// src/evm/evm.bun.ts
var import_ethers = require("ethers");
var import_ethers2 = require("ethers");
var import_ethers3 = require("ethers");
var import_ethers4 = require("ethers");
var import_ethers5 = require("ethers");
var import_ethers6 = require("ethers");
var import_ethers7 = require("ethers");
var import_ethers8 = require("ethers");
var import_ethers9 = require("ethers");
var import_reliq = require("reliq");
var import_reliq2 = require("reliq");
var import_reliq3 = require("reliq");
var import_reliq4 = require("reliq");
var import_reliq5 = require("reliq");
var import_reliq6 = require("reliq");
var import_reliq7 = require("reliq");
var import_reliq8 = require("reliq");
var import_reliq9 = require("reliq");
var import_reliq10 = require("reliq");
var import_reliq11 = require("reliq");
function EthereumVirtualMachine(_url) {
  let _jsonRpcProvider;
  {
    let jsonRpcProvider = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers9.JsonRpcProvider(_url);
    }));
    if (jsonRpcProvider.err()) return jsonRpcProvider;
    _jsonRpcProvider = jsonRpcProvider.unwrap();
    return (0, import_reliq5.Ok)({ query, touch, deploy });
  }
  async function query(transaction) {
    let wallet = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers8.Wallet(transaction.privateKey, _jsonRpcProvider);
    }));
    if (wallet.err()) return wallet;
    let wallet$0 = wallet.unwrap();
    let contract = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers6.Contract(transaction.to, [transaction.signature], wallet$0);
    }));
    if (contract.err()) return contract;
    let contract$0 = contract.unwrap();
    let contractMethod = _map((0, import_reliq9.wrap)(() => {
      return contract$0.getFunction(transaction.signature);
    }));
    if (contractMethod.err()) return contractMethod;
    let contractMethod$0 = contractMethod.unwrap();
    let response = await _map((0, import_reliq10.wrapAsync)(async () => {
      return (0, import_reliq7.Unsafe)(await contractMethod$0(...transaction.payload ?? []));
    }));
    if (response.err()) return response;
    let response$0 = response.unwrap();
    return (0, import_reliq5.Ok)(response$0);
  }
  async function touch(transaction) {
    let wallet = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers8.Wallet(transaction.privateKey, _jsonRpcProvider);
    }));
    if (wallet.err()) return wallet;
    let wallet$0 = wallet.unwrap();
    let address = await _map((0, import_reliq10.wrapAsync)(async () => {
      return await wallet$0.getAddress();
    }));
    if (address.err()) return address;
    let address$0 = address.unwrap();
    let nonce = await _map((0, import_reliq10.wrapAsync)(async () => {
      return BigInt(await wallet$0.getNonce());
    }));
    if (nonce.err()) return nonce;
    let nonce$0 = nonce.unwrap();
    let interface$0 = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers7.Interface([transaction.signature]);
    }));
    if (interface$0.err()) return interface$0;
    let interface$1 = interface$0.unwrap();
    let name = EthereumVirtualMachine.SignatureHandler.nameOf(transaction.signature);
    if (name.none()) return (0, import_reliq6.Err)({
      code: "EVM.ERR_MALFORMED_SIGNATURE",
      data: import_reliq4.None,
      message: import_reliq4.None,
      reason: import_reliq4.None,
      transaction: import_reliq4.None
    });
    let name$0 = name.unwrap();
    let data = _map((0, import_reliq9.wrap)(() => {
      return interface$1.encodeFunctionData(name$0, transaction.payload);
    }));
    if (data.err()) return data;
    let data$0 = data.unwrap();
    let gasPrice = transaction.gasPrice ? import_reliq8.Fpv.Calculator.unwrap(transaction.gasPrice) : 0n;
    let gasLimit = transaction.gasLimit ? import_reliq8.Fpv.Calculator.unwrap(transaction.gasLimit) : 0n;
    let response = await _map((0, import_reliq10.wrapAsync)(async () => {
      return await wallet$0.sendTransaction({
        from: address$0,
        to: transaction.to,
        nonce: Number(nonce$0),
        gasPrice,
        gasLimit,
        data: data$0
      });
    }));
    if (response.err()) return response;
    let response$0 = response.unwrap();
    if (response$0 === null) return (0, import_reliq6.Err)({
      code: "EVM.ERR_INVALID_RESPONSE",
      data: import_reliq4.None,
      message: import_reliq4.None,
      transaction: import_reliq4.None,
      reason: import_reliq4.None
    });
    let receipt = await _map((0, import_reliq10.wrapAsync)(async () => {
      return await response$0.wait(Number(transaction.confirmations), Number(transaction.timeout));
    }));
    if (receipt.err()) return receipt;
    let receipt$0 = receipt.unwrap();
    if (receipt$0 === null) return (0, import_reliq5.Ok)(import_reliq4.None);
    return (0, import_reliq5.Ok)((0, import_reliq3.Some)(receipt$0));
  }
  async function deploy(transaction) {
    let wallet = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers8.Wallet(transaction.privateKey, _jsonRpcProvider);
    }));
    if (wallet.err()) return wallet;
    let wallet$0 = wallet.unwrap();
    let contractFactory = _map((0, import_reliq9.wrap)(() => {
      return new import_ethers5.ContractFactory(transaction.abi, transaction.bytecode, wallet$0);
    }));
    if (contractFactory.err()) return contractFactory;
    let contractFactory$0 = contractFactory.unwrap();
    let contract = await _map((0, import_reliq10.wrapAsync)(async () => {
      return await contractFactory$0.deploy(transaction.payload);
    }));
    if (contract.err()) return contract;
    let contract$0 = contract.unwrap();
    let address = await _map((0, import_reliq10.wrapAsync)(async () => {
      return await contract$0.getAddress();
    }));
    if (address.err()) return address;
    let address$0 = address.unwrap();
    return (0, import_reliq5.Ok)(address$0);
  }
  function _map(p0) {
    if ("then" in p0) {
      let result = p0;
      return result.then((result$0) => {
        return _map(result$0);
      });
    }
    if ("ok" in p0) {
      let result = p0;
      return result.mapErr((error2) => {
        return _map(error2);
      });
    }
    let unsafe = p0;
    let error = unsafe.inspect();
    if (!(error !== null && error !== void 0 && typeof error === "object" && "code" in error && typeof error.code === "string")) return {
      code: "EVM.ERR_UNKNOWN",
      data: import_reliq4.None,
      message: import_reliq4.None,
      transaction: import_reliq4.None,
      reason: import_reliq4.None
    };
    let code = error.code === "UNKNOWN_ERROR" ? "EVM.ERR_UNKNOWN" : error.code === "NOT_IMPLEMENTED" ? "EVM.ERR_NOT_IMPLEMENTED" : error.code === "UNSUPPORTED_OPERATION" ? "EVM.ERR_UNSUPPORTED_OPERATION" : error.code === "NETWORK_ERROR" ? "EVM.ERR_NETWORK_FAULT" : error.code === "SERVER_ERROR" ? "EVM.ERR_SERVER_FAULT" : error.code === "TIMEOUT" ? "EVM.ERR_TIMEOUT" : error.code === "BAD_DATA" ? "EVM.ERR_BAD_DATA" : error.code === "CANCELLED" ? "EVM.ERR_CANCELLED" : error.code === "BUFFER_OVERRUN" ? "EVM.ERR_BUFFER_OVERRUN" : error.code === "NUMERIC_FAULT" ? "EVM.ERR_NUMERIC_FAULT" : error.code === "INVALID_ARGUMENT" ? "EVM.ERR_INVALID_ARGUMENT" : error.code === "MISSING_ARGUMENT" ? "EVM.ERR_MISSING_ARGUMENT" : error.code === "UNEXPECTED_ARGUMENT" ? "EVM.ERR_UNEXPECTED_ARGUMENT" : error.code === "CALL_EXCEPTION" ? "EVM.ERR_CALL_EXCEPTION" : error.code === "INSUFFICIENT_FUNDS" ? "EVM.ERR_INSUFFICIENT_FUNDS" : error.code === "NONCE_EXPIRED" ? "EVM.ERR_NONCE_EXPIRED" : error.code === "REPLACEMENT_UNDERPRICED" ? "EVM.ERR_REPLACEMENT_UNDERPRICED" : error.code === "TRANSACTION_REPLACED" ? "EVM.ERR_TRANSACTION_REPLACED" : error.code === "UNCONFIGURED_NAME" ? "EVM.ERR_UNCONFIGURED_NAME" : error.code === "OFFCHAIN_FAULT" ? "EVM.ERR_OFFCHAIN_FAULT" : error.code === "ACTION_REJECTED" ? "EVM.ERR_ACTION_REJECTED" : "EVM.ERR_UNKNOWN";
    let data = import_reliq4.None;
    let message = import_reliq4.None;
    let transaction = import_reliq4.None;
    let reason = import_reliq4.None;
    if ("data" in error) data = (0, import_reliq3.Some)(error.data);
    if ("message" in error) data = (0, import_reliq3.Some)(error.message);
    if ("transaction" in error) data = (0, import_reliq3.Some)(error.transaction);
    if ("reason" in error) data = (0, import_reliq3.Some)(error.reason);
    return { code, data, message, transaction, reason };
  }
}
((EthereumVirtualMachine3) => {
  function SignatureBuilder() {
    let _this;
    let _name;
    let _type;
    let _visibility;
    let _payload;
    let _returns;
    {
      _this = {
        name,
        event,
        external,
        pure,
        view,
        payload,
        returns,
        build
      };
      _name = import_reliq4.None;
      _type = import_reliq4.None;
      _visibility = import_reliq4.None;
      _payload = import_reliq4.None;
      _returns = import_reliq4.None;
      return _this;
    }
    function name(name2) {
      _name = (0, import_reliq3.Some)(name2);
      return _this;
    }
    function event() {
      _type = (0, import_reliq3.Some)("event");
      return _this;
    }
    function external() {
      _type = (0, import_reliq3.Some)("external");
      return _this;
    }
    function pure() {
      _visibility = (0, import_reliq3.Some)("pure");
      return _this;
    }
    function view() {
      _visibility = (0, import_reliq3.Some)("view");
      return _this;
    }
    function payload(...data) {
      _payload = (0, import_reliq3.Some)(data);
      return _this;
    }
    function returns(...data) {
      _returns = (0, import_reliq3.Some)(data);
      return _this;
    }
    function build() {
      if (_name.none()) return (0, import_reliq6.Err)("SIGNATURE_BUILDER.ERR_MISSING_NAME");
      let name2 = _name.unwrap();
      if (_type.none()) return (0, import_reliq6.Err)("SIGNATURE_BUILDER.ERR_MISSING_TYPE");
      let type = _type.unwrap();
      if (type === "event") {
        let selector = EthereumVirtualMachine3.Selector.from(name2, ..._payload.unwrapOr([]));
        let signature = EthereumVirtualMachine3.EventSignature.from(selector);
        return (0, import_reliq5.Ok)(signature);
      }
      if (type === "external") {
        let selector = EthereumVirtualMachine3.Selector.from(name2, ..._payload.unwrapOr([]));
        if (_visibility.none()) {
          let signature = EthereumVirtualMachine3.ExternalSignature.from(selector);
          return (0, import_reliq5.Ok)(signature);
        }
        let visibility = _visibility.unwrap();
        if (visibility === "pure") {
          let signature = EthereumVirtualMachine3.ExternalPureSignature.from(selector, ..._returns.unwrapOr([]));
          return (0, import_reliq5.Ok)(signature);
        }
        if (visibility === "view") {
          let signature = EthereumVirtualMachine3.ExternalViewSignature.from(selector, ..._returns.unwrapOr([]));
          return (0, import_reliq5.Ok)(signature);
        }
      }
      return (0, import_reliq6.Err)("SIGNATURE_BUILDER.ERR_MALFORMED_SIGNATURE");
    }
  }
  EthereumVirtualMachine3.SignatureBuilder = SignatureBuilder;
  EthereumVirtualMachine3.SignatureHandler = (() => {
    {
      return { nameOf };
    }
    function nameOf(signature) {
      let shards = signature.split(" ");
      if (shards.length === 0) return import_reliq4.None;
      let string = (0, import_reliq11.flag)(shards.at(1));
      if (string.none()) return string;
      let string$0 = string.unwrap();
      let result = (0, import_reliq11.flag)(
        string$0.split("(").at(0)
      );
      if (result.none()) return result;
      let result$0 = result.unwrap();
      return (0, import_reliq3.Some)(result$0);
    }
  })();
  EthereumVirtualMachine3.EventSignature = (() => {
    {
      return { from };
    }
    function from(selector) {
      return `event ${selector}`;
    }
  })();
  EthereumVirtualMachine3.ExternalPureSignature = (() => {
    {
      return { from };
    }
    function from(selector, ...data) {
      return `function ${selector} external pure returns (${EthereumVirtualMachine3.String.from(...data)})`;
    }
  })();
  EthereumVirtualMachine3.ExternalViewSignature = (() => {
    {
      return { from };
    }
    function from(selector, ...data) {
      return `function ${selector} external view returns (${EthereumVirtualMachine3.String.from(...data)})`;
    }
  })();
  EthereumVirtualMachine3.ExternalSignature = (() => {
    {
      return { from };
    }
    function from(selector) {
      return `function ${selector} external`;
    }
  })();
  EthereumVirtualMachine3.Selector = (() => {
    {
      return { from };
    }
    function from(name, ...data) {
      return `${name}(${EthereumVirtualMachine3.String.from(...data)})`;
    }
  })();
  EthereumVirtualMachine3.String = (() => {
    {
      return { from };
    }
    function from(...data) {
      let result = "";
      for (let i = 0n; i < data.length; i++) {
        if (i !== 0n) result = ", ";
        result += data[Number(i)];
      }
      return result;
    }
  })();
})(EthereumVirtualMachine || (EthereumVirtualMachine = {}));

// src/solc/compiler.bun.ts
var import_solc = __toESM(require("solc"), 1);
var import_reliq12 = require("reliq");
var import_reliq13 = require("reliq");
var import_reliq14 = require("reliq");
var import_reliq15 = require("reliq");
function Compiler() {
  {
    return { compile };
  }
  function compile(configuration) {
    let configuration$0 = (0, import_reliq15.wrap)(() => {
      return JSON.stringify(configuration);
    });
    if (configuration$0.err()) return configuration$0;
    let configuration$1 = configuration$0.unwrap();
    let content = (0, import_reliq15.wrap)(() => {
      return import_solc.default.compile(configuration$1);
    });
    if (content.err()) return content;
    let content$0 = content.unwrap();
    let out = (0, import_reliq15.wrap)(() => {
      return JSON.parse(content$0);
    });
    if (out.err()) return out;
    let out$0 = out.unwrap();
    return (0, import_reliq13.Ok)(out$0);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Compiler,
  EthereumVirtualMachine
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vc3JjL21vZC5idW4udHMiLCAiLi4vLi4vc3JjL2V2bS9ldm0uYnVuLnRzIiwgIi4uLy4uL3NyYy9zb2xjL2NvbXBpbGVyLmJ1bi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0ICogZnJvbSBcIi4vZXZtL2V2bS5idW5cIjtcclxuZXhwb3J0ICogZnJvbSBcIi4vc29sYy9jb21waWxlci5idW5cIjsiLCAiaW1wb3J0IHsgdHlwZSBDb250cmFjdE1ldGhvZCB9IGZyb20gXCJldGhlcnNcIjtcclxuaW1wb3J0IHsgdHlwZSBUcmFuc2FjdGlvblJlY2VpcHQgfSBmcm9tIFwiZXRoZXJzXCI7XHJcbmltcG9ydCB7IHR5cGUgVHJhbnNhY3Rpb25SZXNwb25zZSB9IGZyb20gXCJldGhlcnNcIjtcclxuaW1wb3J0IHsgdHlwZSBCYXNlQ29udHJhY3QgfSBmcm9tIFwiZXRoZXJzXCI7XHJcbmltcG9ydCB7IENvbnRyYWN0RmFjdG9yeSB9IGZyb20gXCJldGhlcnNcIjtcclxuaW1wb3J0IHsgQ29udHJhY3QgfSBmcm9tIFwiZXRoZXJzXCI7XHJcbmltcG9ydCB7IEludGVyZmFjZSB9IGZyb20gXCJldGhlcnNcIjtcclxuaW1wb3J0IHsgV2FsbGV0IH0gZnJvbSBcImV0aGVyc1wiO1xyXG5pbXBvcnQgeyBKc29uUnBjUHJvdmlkZXIgfSBmcm9tIFwiZXRoZXJzXCI7XHJcbmltcG9ydCB7IFJlc3VsdCB9IGZyb20gXCJyZWxpcVwiO1xyXG5pbXBvcnQgeyBPcHRpb24gfSBmcm9tIFwicmVsaXFcIjtcclxuaW1wb3J0IHsgU29tZSB9IGZyb20gXCJyZWxpcVwiO1xyXG5pbXBvcnQgeyBOb25lIH0gZnJvbSBcInJlbGlxXCI7XHJcbmltcG9ydCB7IE9rIH0gZnJvbSBcInJlbGlxXCI7XHJcbmltcG9ydCB7IEVyciB9IGZyb20gXCJyZWxpcVwiO1xyXG5pbXBvcnQgeyBVbnNhZmUgfSBmcm9tIFwicmVsaXFcIjtcclxuaW1wb3J0IHsgRnB2IH0gZnJvbSBcInJlbGlxXCI7XHJcbmltcG9ydCB7IHdyYXAgfSBmcm9tIFwicmVsaXFcIjtcclxuaW1wb3J0IHsgd3JhcEFzeW5jIH0gZnJvbSBcInJlbGlxXCI7XHJcbmltcG9ydCB7IGZsYWcgfSBmcm9tIFwicmVsaXFcIjtcclxuXHJcbnR5cGUgVHJhbnNhY3Rpb25SZXNwb25zZSQwID0gVHJhbnNhY3Rpb25SZXNwb25zZTtcclxuXHJcbnR5cGUgVHJhbnNhY3Rpb25SZWNlaXB0JDAgPSBUcmFuc2FjdGlvblJlY2VpcHQ7XHJcblxyXG50eXBlIFJlc3VsdCQwPFQxLCBUMj4gPSBSZXN1bHQ8VDEsIFQyPjtcclxuXHJcbmV4cG9ydCB0eXBlIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUgPSB7XHJcbiAgICBxdWVyeTxUMSBleHRlbmRzIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUGF5bG9hZD4odHJhbnNhY3Rpb246IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUXVlcnk8VDE+KTogUHJvbWlzZTxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxVbnNhZmU+PjtcclxuICAgIHRvdWNoPFQxIGV4dGVuZHMgRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5QYXlsb2FkPih0cmFuc2FjdGlvbjogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5Ub3VjaDxUMT4pOiBQcm9taXNlPEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PE9wdGlvbjxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlRyYW5zYWN0aW9uUmVjZWlwdD4+PjtcclxuICAgIGRlcGxveTxUMSBleHRlbmRzIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUGF5bG9hZD4odHJhbnNhY3Rpb246IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuRGVwbG95bWVudDxUMT4pOiBQcm9taXNlPEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuQWRkcmVzcz4+O1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUoX3VybDogc3RyaW5nKTogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8RXRoZXJldW1WaXJ0dWFsTWFjaGluZT4ge1xyXG4gICAgbGV0IF9qc29uUnBjUHJvdmlkZXI6IEpzb25ScGNQcm92aWRlcjtcclxuXHJcbiAgICAvKioqLyB7XHJcbiAgICAgICAgbGV0IGpzb25ScGNQcm92aWRlcjogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8SnNvblJwY1Byb3ZpZGVyPiA9IF9tYXAod3JhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSnNvblJwY1Byb3ZpZGVyKF91cmwpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAoanNvblJwY1Byb3ZpZGVyLmVycigpKSByZXR1cm4ganNvblJwY1Byb3ZpZGVyO1xyXG4gICAgICAgIF9qc29uUnBjUHJvdmlkZXIgPSBqc29uUnBjUHJvdmlkZXIudW53cmFwKCk7XHJcbiAgICAgICAgcmV0dXJuIE9rKHsgcXVlcnksIHRvdWNoLCBkZXBsb3kgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZnVuY3Rpb24gcXVlcnk8VDEgZXh0ZW5kcyBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlBheWxvYWQ+KHRyYW5zYWN0aW9uOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlF1ZXJ5PFQxPik6IFByb21pc2U8RXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8VW5zYWZlPj4ge1xyXG4gICAgICAgIGxldCB3YWxsZXQ6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PFdhbGxldD4gPSBfbWFwKHdyYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFdhbGxldCh0cmFuc2FjdGlvbi5wcml2YXRlS2V5LCBfanNvblJwY1Byb3ZpZGVyKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKHdhbGxldC5lcnIoKSkgcmV0dXJuIHdhbGxldDtcclxuICAgICAgICBsZXQgd2FsbGV0JDA6IFdhbGxldCA9IHdhbGxldC51bndyYXAoKTtcclxuICAgICAgICBsZXQgY29udHJhY3Q6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PENvbnRyYWN0PiA9IF9tYXAod3JhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJhY3QodHJhbnNhY3Rpb24udG8sIFt0cmFuc2FjdGlvbi5zaWduYXR1cmVdLCB3YWxsZXQkMCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmIChjb250cmFjdC5lcnIoKSkgcmV0dXJuIGNvbnRyYWN0O1xyXG4gICAgICAgIGxldCBjb250cmFjdCQwOiBDb250cmFjdCA9IGNvbnRyYWN0LnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBjb250cmFjdE1ldGhvZDogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8Q29udHJhY3RNZXRob2Q+ID0gX21hcCh3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGNvbnRyYWN0JDAuZ2V0RnVuY3Rpb24odHJhbnNhY3Rpb24uc2lnbmF0dXJlKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKGNvbnRyYWN0TWV0aG9kLmVycigpKSByZXR1cm4gY29udHJhY3RNZXRob2Q7XHJcbiAgICAgICAgbGV0IGNvbnRyYWN0TWV0aG9kJDA6IENvbnRyYWN0TWV0aG9kID0gY29udHJhY3RNZXRob2QudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxVbnNhZmU+ID0gYXdhaXQgX21hcCh3cmFwQXN5bmMoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gVW5zYWZlKGF3YWl0IGNvbnRyYWN0TWV0aG9kJDAoLi4udHJhbnNhY3Rpb24ucGF5bG9hZCA/PyBbXSkpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UuZXJyKCkpIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICBsZXQgcmVzcG9uc2UkMDogVW5zYWZlID0gcmVzcG9uc2UudW53cmFwKCk7XHJcbiAgICAgICAgcmV0dXJuIE9rKHJlc3BvbnNlJDApO1xyXG4gICAgfVxyXG5cclxuICAgIGFzeW5jIGZ1bmN0aW9uIHRvdWNoPFQxIGV4dGVuZHMgRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5QYXlsb2FkPih0cmFuc2FjdGlvbjogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5Ub3VjaDxUMT4pOiBQcm9taXNlPEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PE9wdGlvbjxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlRyYW5zYWN0aW9uUmVjZWlwdD4+PiB7XHJcbiAgICAgICAgbGV0IHdhbGxldDogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8V2FsbGV0PiA9IF9tYXAod3JhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgV2FsbGV0KHRyYW5zYWN0aW9uLnByaXZhdGVLZXksIF9qc29uUnBjUHJvdmlkZXIpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAod2FsbGV0LmVycigpKSByZXR1cm4gd2FsbGV0O1xyXG4gICAgICAgIGxldCB3YWxsZXQkMDogV2FsbGV0ID0gd2FsbGV0LnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBhZGRyZXNzOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkFkZHJlc3M+ID0gYXdhaXQgX21hcCh3cmFwQXN5bmMoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgd2FsbGV0JDAuZ2V0QWRkcmVzcygpIGFzIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuQWRkcmVzcztcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKGFkZHJlc3MuZXJyKCkpIHJldHVybiBhZGRyZXNzO1xyXG4gICAgICAgIGxldCBhZGRyZXNzJDA6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuQWRkcmVzcyA9IGFkZHJlc3MudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IG5vbmNlOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxiaWdpbnQ+ID0gYXdhaXQgX21hcCh3cmFwQXN5bmMoYXN5bmMgKCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gQmlnSW50KGF3YWl0IHdhbGxldCQwLmdldE5vbmNlKCkpO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAobm9uY2UuZXJyKCkpIHJldHVybiBub25jZTtcclxuICAgICAgICBsZXQgbm9uY2UkMDogYmlnaW50ID0gbm9uY2UudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IGludGVyZmFjZSQwOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxJbnRlcmZhY2U+ID0gX21hcCh3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJbnRlcmZhY2UoW3RyYW5zYWN0aW9uLnNpZ25hdHVyZV0pO1xyXG4gICAgICAgIH0pKTtcclxuICAgICAgICBpZiAoaW50ZXJmYWNlJDAuZXJyKCkpIHJldHVybiBpbnRlcmZhY2UkMDtcclxuICAgICAgICBsZXQgaW50ZXJmYWNlJDE6IEludGVyZmFjZSA9IGludGVyZmFjZSQwLnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBuYW1lOiBPcHRpb248c3RyaW5nPiA9IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuU2lnbmF0dXJlSGFuZGxlci5uYW1lT2YodHJhbnNhY3Rpb24uc2lnbmF0dXJlKTtcclxuICAgICAgICBpZiAobmFtZS5ub25lKCkpIHJldHVybiBFcnIoe1xyXG4gICAgICAgICAgICBjb2RlOiBcIkVWTS5FUlJfTUFMRk9STUVEX1NJR05BVFVSRVwiLFxyXG4gICAgICAgICAgICBkYXRhOiBOb25lLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBOb25lLFxyXG4gICAgICAgICAgICByZWFzb246IE5vbmUsXHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBOb25lXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbGV0IG5hbWUkMDogc3RyaW5nID0gbmFtZS51bndyYXAoKTtcclxuICAgICAgICBsZXQgZGF0YTogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8c3RyaW5nPiA9IF9tYXAod3JhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRlcmZhY2UkMS5lbmNvZGVGdW5jdGlvbkRhdGEobmFtZSQwLCB0cmFuc2FjdGlvbi5wYXlsb2FkKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKGRhdGEuZXJyKCkpIHJldHVybiBkYXRhO1xyXG4gICAgICAgIGxldCBkYXRhJDA6IHN0cmluZyA9IGRhdGEudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IGdhc1ByaWNlOiBiaWdpbnQgPSB0cmFuc2FjdGlvbi5nYXNQcmljZSA/IEZwdi5DYWxjdWxhdG9yLnVud3JhcCh0cmFuc2FjdGlvbi5nYXNQcmljZSkgOiAwbjtcclxuICAgICAgICBsZXQgZ2FzTGltaXQ6IGJpZ2ludCA9IHRyYW5zYWN0aW9uLmdhc0xpbWl0ID8gRnB2LkNhbGN1bGF0b3IudW53cmFwKHRyYW5zYWN0aW9uLmdhc0xpbWl0KSA6IDBuO1xyXG4gICAgICAgIGxldCByZXNwb25zZTogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8RXRoZXJldW1WaXJ0dWFsTWFjaGluZS5UcmFuc2FjdGlvblJlc3BvbnNlIHwgbnVsbD4gPSBhd2FpdCBfbWFwKHdyYXBBc3luYyhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCB3YWxsZXQkMC5zZW5kVHJhbnNhY3Rpb24oe1xyXG4gICAgICAgICAgICAgICAgZnJvbTogYWRkcmVzcyQwLFxyXG4gICAgICAgICAgICAgICAgdG86IHRyYW5zYWN0aW9uLnRvLFxyXG4gICAgICAgICAgICAgICAgbm9uY2U6IE51bWJlcihub25jZSQwKSxcclxuICAgICAgICAgICAgICAgIGdhc1ByaWNlOiBnYXNQcmljZSxcclxuICAgICAgICAgICAgICAgIGdhc0xpbWl0OiBnYXNMaW1pdCxcclxuICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEkMFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycigpKSByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgbGV0IHJlc3BvbnNlJDA6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuVHJhbnNhY3Rpb25SZXNwb25zZSB8IG51bGwgPSByZXNwb25zZS51bndyYXAoKTtcclxuICAgICAgICBpZiAocmVzcG9uc2UkMCA9PT0gbnVsbCkgcmV0dXJuIEVycih7XHJcbiAgICAgICAgICAgIGNvZGU6IFwiRVZNLkVSUl9JTlZBTElEX1JFU1BPTlNFXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IE5vbmUsXHJcbiAgICAgICAgICAgIG1lc3NhZ2U6IE5vbmUsXHJcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uOiBOb25lLFxyXG4gICAgICAgICAgICByZWFzb246IE5vbmVcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgcmVjZWlwdDogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8RXRoZXJldW1WaXJ0dWFsTWFjaGluZS5UcmFuc2FjdGlvblJlY2VpcHQgfCBudWxsPiA9IGF3YWl0IF9tYXAod3JhcEFzeW5jKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHJlc3BvbnNlJDAud2FpdChOdW1iZXIodHJhbnNhY3Rpb24uY29uZmlybWF0aW9ucyksIE51bWJlcih0cmFuc2FjdGlvbi50aW1lb3V0KSk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmIChyZWNlaXB0LmVycigpKSByZXR1cm4gcmVjZWlwdDtcclxuICAgICAgICBsZXQgcmVjZWlwdCQwOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlRyYW5zYWN0aW9uUmVjZWlwdCB8IG51bGwgPSByZWNlaXB0LnVud3JhcCgpO1xyXG4gICAgICAgIGlmIChyZWNlaXB0JDAgPT09IG51bGwpIHJldHVybiBPayhOb25lKTtcclxuICAgICAgICByZXR1cm4gT2soU29tZShyZWNlaXB0JDApKTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBmdW5jdGlvbiBkZXBsb3k8VDEgZXh0ZW5kcyBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlBheWxvYWQ+KHRyYW5zYWN0aW9uOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkRlcGxveW1lbnQ8VDE+KTogUHJvbWlzZTxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkFkZHJlc3M+PiB7ICAgICAgICBcclxuICAgICAgICBsZXQgd2FsbGV0OiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxXYWxsZXQ+ID0gX21hcCh3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBXYWxsZXQodHJhbnNhY3Rpb24ucHJpdmF0ZUtleSwgX2pzb25ScGNQcm92aWRlcik7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmICh3YWxsZXQuZXJyKCkpIHJldHVybiB3YWxsZXQ7XHJcbiAgICAgICAgbGV0IHdhbGxldCQwOiBXYWxsZXQgPSB3YWxsZXQudW53cmFwKCk7XHJcbiAgICAgICAgbGV0IGNvbnRyYWN0RmFjdG9yeTogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8Q29udHJhY3RGYWN0b3J5PiA9IF9tYXAod3JhcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ29udHJhY3RGYWN0b3J5KHRyYW5zYWN0aW9uLmFiaSwgdHJhbnNhY3Rpb24uYnl0ZWNvZGUsIHdhbGxldCQwKTtcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKGNvbnRyYWN0RmFjdG9yeS5lcnIoKSkgcmV0dXJuIGNvbnRyYWN0RmFjdG9yeTtcclxuICAgICAgICBsZXQgY29udHJhY3RGYWN0b3J5JDA6IENvbnRyYWN0RmFjdG9yeSA9IGNvbnRyYWN0RmFjdG9yeS51bndyYXAoKTtcclxuICAgICAgICBsZXQgY29udHJhY3Q6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuUmVzdWx0PEJhc2VDb250cmFjdD4gPSBhd2FpdCBfbWFwKHdyYXBBc3luYyhhc3luYyAoKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBhd2FpdCBjb250cmFjdEZhY3RvcnkkMC5kZXBsb3kodHJhbnNhY3Rpb24ucGF5bG9hZCk7XHJcbiAgICAgICAgfSkpO1xyXG4gICAgICAgIGlmIChjb250cmFjdC5lcnIoKSkgcmV0dXJuIGNvbnRyYWN0O1xyXG4gICAgICAgIGxldCBjb250cmFjdCQwOiBCYXNlQ29udHJhY3QgPSBjb250cmFjdC51bndyYXAoKTtcclxuICAgICAgICBsZXQgYWRkcmVzczogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8RXRoZXJldW1WaXJ0dWFsTWFjaGluZS5BZGRyZXNzPiA9IGF3YWl0IF9tYXAod3JhcEFzeW5jKGFzeW5jICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGNvbnRyYWN0JDAuZ2V0QWRkcmVzcygpIGFzIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuQWRkcmVzcztcclxuICAgICAgICB9KSk7XHJcbiAgICAgICAgaWYgKGFkZHJlc3MuZXJyKCkpIHJldHVybiBhZGRyZXNzO1xyXG4gICAgICAgIGxldCBhZGRyZXNzJDA6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuQWRkcmVzcyA9IGFkZHJlc3MudW53cmFwKCk7XHJcbiAgICAgICAgcmV0dXJuIE9rKGFkZHJlc3MkMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gX21hcDxUMT4ocmVzdWx0OiBQcm9taXNlPFJlc3VsdCQwPFQxLCBVbnNhZmU+Pik6IFByb21pc2U8RXRoZXJldW1WaXJ0dWFsTWFjaGluZS5SZXN1bHQ8VDE+PjtcclxuICAgIGZ1bmN0aW9uIF9tYXA8VDE+KHJlc3VsdDogUmVzdWx0JDA8VDEsIFVuc2FmZT4pOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxUMT47XHJcbiAgICBmdW5jdGlvbiBfbWFwPFQxPih1bnNhZmU6IFVuc2FmZSk6IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUuRXJyb3I7XHJcbiAgICBmdW5jdGlvbiBfbWFwPFQxPihcclxuICAgICAgICBwMDogXHJcbiAgICAgICAgICAgIHwgUHJvbWlzZTxSZXN1bHQkMDxUMSwgVW5zYWZlPj5cclxuICAgICAgICAgICAgfCBSZXN1bHQkMDxUMSwgVW5zYWZlPiBcclxuICAgICAgICAgICAgfCBVbnNhZmVcclxuICAgICk6IFxyXG4gICAgICAgIHwgUHJvbWlzZTxFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxUMT4+XHJcbiAgICAgICAgfCBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlJlc3VsdDxUMT4gXHJcbiAgICAgICAgfCBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkVycm9yIHtcclxuICAgICAgICBpZiAoXCJ0aGVuXCIgaW4gcDApIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogUHJvbWlzZTxSZXN1bHQkMDxUMSwgVW5zYWZlPj4gPSBwMDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC50aGVuKHJlc3VsdCQwID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfbWFwKHJlc3VsdCQwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChcIm9rXCIgaW4gcDApIHtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogUmVzdWx0JDA8VDEsIFVuc2FmZT4gPSBwMDtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5tYXBFcnIoZXJyb3IgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tYXAoZXJyb3IpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHVuc2FmZTogVW5zYWZlID0gcDA7XHJcbiAgICAgICAgbGV0IGVycm9yOiB1bmtub3duID0gdW5zYWZlLmluc3BlY3QoKTtcclxuICAgICAgICBpZiAoIShcclxuICAgICAgICAgICAgZXJyb3IgIT09IG51bGxcclxuICAgICAgICAgICAgJiYgZXJyb3IgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICAmJiB0eXBlb2YgZXJyb3IgPT09IFwib2JqZWN0XCJcclxuICAgICAgICAgICAgJiYgXCJjb2RlXCIgaW4gZXJyb3JcclxuICAgICAgICAgICAgJiYgdHlwZW9mIGVycm9yLmNvZGUgPT09IFwic3RyaW5nXCJcclxuICAgICAgICApKSByZXR1cm4ge1xyXG4gICAgICAgICAgICBjb2RlOiBcIkVWTS5FUlJfVU5LTk9XTlwiLFxyXG4gICAgICAgICAgICBkYXRhOiBOb25lLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiBOb25lLFxyXG4gICAgICAgICAgICB0cmFuc2FjdGlvbjogTm9uZSxcclxuICAgICAgICAgICAgcmVhc29uOiBOb25lXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgY29kZTogRXRoZXJldW1WaXJ0dWFsTWFjaGluZS5FcnJvckNvZGUgPVxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIlVOS05PV05fRVJST1JcIiA/IFwiRVZNLkVSUl9VTktOT1dOXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIk5PVF9JTVBMRU1FTlRFRFwiID8gXCJFVk0uRVJSX05PVF9JTVBMRU1FTlRFRFwiIDpcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9PT0gXCJVTlNVUFBPUlRFRF9PUEVSQVRJT05cIiA/IFwiRVZNLkVSUl9VTlNVUFBPUlRFRF9PUEVSQVRJT05cIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiTkVUV09SS19FUlJPUlwiID8gXCJFVk0uRVJSX05FVFdPUktfRkFVTFRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiU0VSVkVSX0VSUk9SXCIgPyBcIkVWTS5FUlJfU0VSVkVSX0ZBVUxUXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIlRJTUVPVVRcIiA/IFwiRVZNLkVSUl9USU1FT1VUXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIkJBRF9EQVRBXCIgPyBcIkVWTS5FUlJfQkFEX0RBVEFcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiQ0FOQ0VMTEVEXCIgPyBcIkVWTS5FUlJfQ0FOQ0VMTEVEXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIkJVRkZFUl9PVkVSUlVOXCIgPyBcIkVWTS5FUlJfQlVGRkVSX09WRVJSVU5cIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiTlVNRVJJQ19GQVVMVFwiID8gXCJFVk0uRVJSX05VTUVSSUNfRkFVTFRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiSU5WQUxJRF9BUkdVTUVOVFwiID8gXCJFVk0uRVJSX0lOVkFMSURfQVJHVU1FTlRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiTUlTU0lOR19BUkdVTUVOVFwiID8gXCJFVk0uRVJSX01JU1NJTkdfQVJHVU1FTlRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiVU5FWFBFQ1RFRF9BUkdVTUVOVFwiID8gXCJFVk0uRVJSX1VORVhQRUNURURfQVJHVU1FTlRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiQ0FMTF9FWENFUFRJT05cIiA/IFwiRVZNLkVSUl9DQUxMX0VYQ0VQVElPTlwiIDogXHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiSU5TVUZGSUNJRU5UX0ZVTkRTXCIgPyBcIkVWTS5FUlJfSU5TVUZGSUNJRU5UX0ZVTkRTXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIk5PTkNFX0VYUElSRURcIiA/IFwiRVZNLkVSUl9OT05DRV9FWFBJUkVEXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIlJFUExBQ0VNRU5UX1VOREVSUFJJQ0VEXCIgPyBcIkVWTS5FUlJfUkVQTEFDRU1FTlRfVU5ERVJQUklDRURcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiVFJBTlNBQ1RJT05fUkVQTEFDRURcIiA/IFwiRVZNLkVSUl9UUkFOU0FDVElPTl9SRVBMQUNFRFwiIDpcclxuICAgICAgICAgICAgZXJyb3IuY29kZSA9PT0gXCJVTkNPTkZJR1VSRURfTkFNRVwiID8gXCJFVk0uRVJSX1VOQ09ORklHVVJFRF9OQU1FXCIgOlxyXG4gICAgICAgICAgICBlcnJvci5jb2RlID09PSBcIk9GRkNIQUlOX0ZBVUxUXCIgPyBcIkVWTS5FUlJfT0ZGQ0hBSU5fRkFVTFRcIiA6XHJcbiAgICAgICAgICAgIGVycm9yLmNvZGUgPT09IFwiQUNUSU9OX1JFSkVDVEVEXCIgPyBcIkVWTS5FUlJfQUNUSU9OX1JFSkVDVEVEXCIgOlxyXG4gICAgICAgICAgICBcIkVWTS5FUlJfVU5LTk9XTlwiO1xyXG4gICAgICAgIGxldCBkYXRhOiBPcHRpb248dW5rbm93bj4gPSBOb25lO1xyXG4gICAgICAgIGxldCBtZXNzYWdlOiBPcHRpb248dW5rbm93bj4gPSBOb25lO1xyXG4gICAgICAgIGxldCB0cmFuc2FjdGlvbjogT3B0aW9uPHVua25vd24+ID0gTm9uZTtcclxuICAgICAgICBsZXQgcmVhc29uOiBPcHRpb248dW5rbm93bj4gPSBOb25lO1xyXG4gICAgICAgIGlmIChcImRhdGFcIiBpbiBlcnJvcikgZGF0YSA9IFNvbWUoZXJyb3IuZGF0YSk7XHJcbiAgICAgICAgaWYgKFwibWVzc2FnZVwiIGluIGVycm9yKSBkYXRhID0gU29tZShlcnJvci5tZXNzYWdlKTtcclxuICAgICAgICBpZiAoXCJ0cmFuc2FjdGlvblwiIGluIGVycm9yKSBkYXRhID0gU29tZShlcnJvci50cmFuc2FjdGlvbik7XHJcbiAgICAgICAgaWYgKFwicmVhc29uXCIgaW4gZXJyb3IpIGRhdGEgPSBTb21lKGVycm9yLnJlYXNvbik7XHJcbiAgICAgICAgcmV0dXJuIHsgY29kZSwgZGF0YSwgbWVzc2FnZSwgdHJhbnNhY3Rpb24sIHJlYXNvbiB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgbmFtZXNwYWNlIEV0aGVyZXVtVmlydHVhbE1hY2hpbmUge1xyXG4gICAgZXhwb3J0IHR5cGUgUmVzdWx0PFQxPiA9IFJlc3VsdCQwPFQxLCBFcnJvcj47XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXJyb3IgPSB7XHJcbiAgICAgICAgY29kZTogRXJyb3JDb2RlO1xyXG4gICAgICAgIGRhdGE6IE9wdGlvbjx1bmtub3duPjtcclxuICAgICAgICBtZXNzYWdlOiBPcHRpb248dW5rbm93bj47XHJcbiAgICAgICAgdHJhbnNhY3Rpb246IE9wdGlvbjx1bmtub3duPjtcclxuICAgICAgICByZWFzb246IE9wdGlvbjx1bmtub3duPjtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXJyb3JDb2RlID1cclxuICAgICAgICB8IFwiRVZNLkVSUl9NQUxGT1JNRURfU0lHTkFUVVJFXCJcclxuXHJcbiAgICAgICAgLy8vIEdlbmVyaWNcclxuICAgICAgICB8IFwiRVZNLkVSUl9VTktOT1dOXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9OT1RfSU1QTEVNRU5URURcIlxyXG4gICAgICAgIHwgXCJFVk0uRVJSX1VOU1VQUE9SVEVEX09QRVJBVElPTlwiXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfTkVUV09SS19GQVVMVFwiXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfU0VSVkVSX0ZBVUxUXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9USU1FT1VUXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9CQURfREFUQVwiXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfQ0FOQ0VMTEVEXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9JTlZBTElEX1JFU1BPTlNFXCJcclxuXHJcbiAgICAgICAgLy8vIE9wZXJhdGlvbmFsXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfQlVGRkVSX09WRVJSVU5cIlxyXG4gICAgICAgIHwgXCJFVk0uRVJSX05VTUVSSUNfRkFVTFRcIlxyXG5cclxuICAgICAgICAvLy8gQXJndW1lbnRcclxuICAgICAgICB8IFwiRVZNLkVSUl9JTlZBTElEX0FSR1VNRU5UXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9NSVNTSU5HX0FSR1VNRU5UXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9VTkVYUEVDVEVEX0FSR1VNRU5UXCJcclxuXHJcbiAgICAgICAgLy8vIEJsb2NrY2hhaW5cclxuICAgICAgICB8IFwiRVZNLkVSUl9DQUxMX0VYQ0VQVElPTlwiXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfSU5TVUZGSUNJRU5UX0ZVTkRTXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9OT05DRV9FWFBJUkVEXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9SRVBMQUNFTUVOVF9VTkRFUlBSSUNFRFwiXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfVFJBTlNBQ1RJT05fUkVQTEFDRURcIlxyXG4gICAgICAgIHwgXCJFVk0uRVJSX1VOQ09ORklHVVJFRF9OQU1FXCJcclxuICAgICAgICB8IFwiRVZNLkVSUl9PRkZDSEFJTl9GQVVMVFwiXHJcblxyXG4gICAgICAgIC8vLyBVc2VyIEludGVyYWN0aW9uXHJcbiAgICAgICAgfCBcIkVWTS5FUlJfQUNUSU9OX1JFSkVDVEVEXCI7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgVHJhbnNhY3Rpb25SZXNwb25zZSA9IFRyYW5zYWN0aW9uUmVzcG9uc2UkMDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBUcmFuc2FjdGlvblJlY2VpcHQgPSBUcmFuc2FjdGlvblJlY2VpcHQkMDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBUcmFuc2FjdGlvbjxUMSBleHRlbmRzIFBheWxvYWQgPSBQYXlsb2FkPiA9XHJcbiAgICAgICAgfCBRdWVyeTxUMT5cclxuICAgICAgICB8IFRvdWNoPFQxPlxyXG4gICAgICAgIHwgRGVwbG95bWVudDxUMT47XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgUXVlcnk8VDEgZXh0ZW5kcyBQYXlsb2FkID0gUGF5bG9hZD4gPSB7XHJcbiAgICAgICAgcHJpdmF0ZUtleTogc3RyaW5nO1xyXG4gICAgICAgIHRvOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkFkZHJlc3M7XHJcbiAgICAgICAgc2lnbmF0dXJlOiBOb25OZXV0cmFsU2lnbmF0dXJlO1xyXG4gICAgICAgIHBheWxvYWQ/OiBUMTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgVG91Y2g8VDEgZXh0ZW5kcyBQYXlsb2FkID0gUGF5bG9hZD4gPSB7XHJcbiAgICAgICAgcHJpdmF0ZUtleTogc3RyaW5nO1xyXG4gICAgICAgIHRvOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLkFkZHJlc3M7XHJcbiAgICAgICAgc2lnbmF0dXJlOiBOb25OZXV0cmFsU2lnbmF0dXJlO1xyXG4gICAgICAgIHBheWxvYWQ/OiBUMTtcclxuICAgICAgICBnYXNQcmljZT86IEZwdi5Db21wYXRpYmxlPDE4bj47XHJcbiAgICAgICAgZ2FzTGltaXQ/OiBGcHYuQ29tcGF0aWJsZTwxOG4+O1xyXG4gICAgICAgIGFtb3VudD86IEZwdi5Db21wYXRpYmxlPDE4bj47XHJcbiAgICAgICAgY2hhaW5JZD86IGJpZ2ludDtcclxuICAgICAgICB0aW1lb3V0PzogYmlnaW50O1xyXG4gICAgICAgIGNvbmZpcm1hdGlvbnM/OiBiaWdpbnQ7XHJcbiAgICB9O1xyXG4gICAgXHJcbiAgICBleHBvcnQgdHlwZSBEZXBsb3ltZW50PFQxIGV4dGVuZHMgUGF5bG9hZCA9IFBheWxvYWQ+ID0ge1xyXG4gICAgICAgIHByaXZhdGVLZXk6IHN0cmluZztcclxuICAgICAgICBieXRlY29kZTogQnl0ZWNvZGU7XHJcbiAgICAgICAgYWJpOiBBYnN0cmFjdEJpbmFyeUludGVyZmFjZTtcclxuICAgICAgICBwYXlsb2FkPzogVDE7XHJcbiAgICAgICAgZ2FzUHJpY2U/OiBGcHYuQ29tcGF0aWJsZTwxOG4+O1xyXG4gICAgICAgIGdhc0xpbWl0PzogRnB2LkNvbXBhdGlibGU8MThuPjtcclxuICAgICAgICBhbW91bnQ/OiBGcHYuQ29tcGF0aWJsZTwxOG4+O1xyXG4gICAgICAgIGNoYWluSWQ/OiBiaWdpbnQ7XHJcbiAgICAgICAgY29uZmlybWF0aW9ucz86IGJpZ2ludDtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgUGF5bG9hZCA9IEFycmF5PHVua25vd24+O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIE5vbk5ldXRyYWxTaWduYXR1cmUgPSBFeGNsdWRlPFNpZ25hdHVyZSwgRXZlbnRTaWduYXR1cmU+O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIFNpZ25hdHVyZSA9XHJcbiAgICAgICAgfCBFdmVudFNpZ25hdHVyZVxyXG4gICAgICAgIHwgRXh0ZXJuYWxQdXJlU2lnbmF0dXJlXHJcbiAgICAgICAgfCBFeHRlcm5hbFZpZXdTaWduYXR1cmVcclxuICAgICAgICB8IEV4dGVybmFsU2lnbmF0dXJlO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIFNpZ25hdHVyZUJ1aWxkZXJSZXN1bHQ8VDE+ID0gUmVzdWx0JDA8VDEsIFNpZ25hdHVyZUJ1aWxkZXJFcnJvckNvZGU+O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIFNpZ25hdHVyZUJ1aWxkZXJFcnJvckNvZGUgPVxyXG4gICAgICAgIHwgXCJTSUdOQVRVUkVfQlVJTERFUi5FUlJfTUlTU0lOR19OQU1FXCJcclxuICAgICAgICB8IFwiU0lHTkFUVVJFX0JVSUxERVIuRVJSX01JU1NJTkdfVFlQRVwiXHJcbiAgICAgICAgfCBcIlNJR05BVFVSRV9CVUlMREVSLkVSUl9NQUxGT1JNRURfU0lHTkFUVVJFXCI7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgU2lnbmF0dXJlQnVpbGRlciA9IHtcclxuICAgICAgICBuYW1lKG5hbWU6IHN0cmluZyk6IFNpZ25hdHVyZUJ1aWxkZXI7XHJcbiAgICAgICAgZXZlbnQoKTogU2lnbmF0dXJlQnVpbGRlcjtcclxuICAgICAgICBleHRlcm5hbCgpOiBTaWduYXR1cmVCdWlsZGVyO1xyXG4gICAgICAgIHB1cmUoKTogU2lnbmF0dXJlQnVpbGRlcjtcclxuICAgICAgICB2aWV3KCk6IFNpZ25hdHVyZUJ1aWxkZXI7XHJcbiAgICAgICAgcGF5bG9hZCguLi5kYXRhOiBBcnJheTxEYXRhPik6IFNpZ25hdHVyZUJ1aWxkZXI7XHJcbiAgICAgICAgcmV0dXJucyguLi5kYXRhOiBBcnJheTxEYXRhPik6IFNpZ25hdHVyZUJ1aWxkZXI7XHJcbiAgICAgICAgYnVpbGQoKTogU2lnbmF0dXJlQnVpbGRlclJlc3VsdDxTaWduYXR1cmU+O1xyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gU2lnbmF0dXJlQnVpbGRlcigpOiBTaWduYXR1cmVCdWlsZGVyIHtcclxuICAgICAgICBsZXQgX3RoaXM6IFNpZ25hdHVyZUJ1aWxkZXI7XHJcbiAgICAgICAgbGV0IF9uYW1lOiBPcHRpb248c3RyaW5nPjtcclxuICAgICAgICBsZXQgX3R5cGU6IE9wdGlvbjxcImV2ZW50XCIgfCBcImV4dGVybmFsXCI+O1xyXG4gICAgICAgIGxldCBfdmlzaWJpbGl0eTogT3B0aW9uPFwicHVyZVwiIHwgXCJ2aWV3XCI+O1xyXG4gICAgICAgIGxldCBfcGF5bG9hZDogT3B0aW9uPEFycmF5PERhdGE+PjtcclxuICAgICAgICBsZXQgX3JldHVybnM6IE9wdGlvbjxBcnJheTxEYXRhPj47XHJcbiAgICAgICAgXHJcbiAgICAgICAgLyoqKi8ge1xyXG4gICAgICAgICAgICBfdGhpcyA9IHtcclxuICAgICAgICAgICAgICAgIG5hbWUsXHJcbiAgICAgICAgICAgICAgICBldmVudCxcclxuICAgICAgICAgICAgICAgIGV4dGVybmFsLFxyXG4gICAgICAgICAgICAgICAgcHVyZSxcclxuICAgICAgICAgICAgICAgIHZpZXcsXHJcbiAgICAgICAgICAgICAgICBwYXlsb2FkLFxyXG4gICAgICAgICAgICAgICAgcmV0dXJucyxcclxuICAgICAgICAgICAgICAgIGJ1aWxkXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIF9uYW1lID0gTm9uZTtcclxuICAgICAgICAgICAgX3R5cGUgPSBOb25lO1xyXG4gICAgICAgICAgICBfdmlzaWJpbGl0eSA9IE5vbmU7XHJcbiAgICAgICAgICAgIF9wYXlsb2FkID0gTm9uZTtcclxuICAgICAgICAgICAgX3JldHVybnMgPSBOb25lO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBuYW1lKG5hbWU6IHN0cmluZyk6IFNpZ25hdHVyZUJ1aWxkZXIge1xyXG4gICAgICAgICAgICBfbmFtZSA9IFNvbWUobmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGV2ZW50KCk6IFNpZ25hdHVyZUJ1aWxkZXIge1xyXG4gICAgICAgICAgICBfdHlwZSA9IFNvbWU8XCJldmVudFwiPihcImV2ZW50XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBleHRlcm5hbCgpOiBTaWduYXR1cmVCdWlsZGVyIHtcclxuICAgICAgICAgICAgX3R5cGUgPSBTb21lPFwiZXh0ZXJuYWxcIj4oXCJleHRlcm5hbFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHVyZSgpOiBTaWduYXR1cmVCdWlsZGVyIHtcclxuICAgICAgICAgICAgX3Zpc2liaWxpdHkgPSBTb21lPFwicHVyZVwiPihcInB1cmVcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHZpZXcoKTogU2lnbmF0dXJlQnVpbGRlciB7XHJcbiAgICAgICAgICAgIF92aXNpYmlsaXR5ID0gU29tZTxcInZpZXdcIj4oXCJ2aWV3XCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gX3RoaXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBwYXlsb2FkKC4uLmRhdGE6IEFycmF5PERhdGE+KTogU2lnbmF0dXJlQnVpbGRlciB7XHJcbiAgICAgICAgICAgIF9wYXlsb2FkID0gU29tZShkYXRhKTtcclxuICAgICAgICAgICAgcmV0dXJuIF90aGlzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcmV0dXJucyguLi5kYXRhOiBBcnJheTxEYXRhPik6IFNpZ25hdHVyZUJ1aWxkZXIge1xyXG4gICAgICAgICAgICBfcmV0dXJucyA9IFNvbWUoZGF0YSk7XHJcbiAgICAgICAgICAgIHJldHVybiBfdGhpcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkKCk6IFNpZ25hdHVyZUJ1aWxkZXJSZXN1bHQ8U2lnbmF0dXJlPiB7XHJcbiAgICAgICAgICAgIGlmIChfbmFtZS5ub25lKCkpIHJldHVybiBFcnIoXCJTSUdOQVRVUkVfQlVJTERFUi5FUlJfTUlTU0lOR19OQU1FXCIpO1xyXG4gICAgICAgICAgICBsZXQgbmFtZTogc3RyaW5nID0gX25hbWUudW53cmFwKCk7XHJcbiAgICAgICAgICAgIGlmIChfdHlwZS5ub25lKCkpIHJldHVybiBFcnIoXCJTSUdOQVRVUkVfQlVJTERFUi5FUlJfTUlTU0lOR19UWVBFXCIpO1xyXG4gICAgICAgICAgICBsZXQgdHlwZTogXCJldmVudFwiIHwgXCJleHRlcm5hbFwiID0gX3R5cGUudW53cmFwKCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09PSBcImV2ZW50XCIpIHtcclxuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RvcjogU2VsZWN0b3IgPSBTZWxlY3Rvci5mcm9tKG5hbWUsIC4uLl9wYXlsb2FkLnVud3JhcE9yKFtdKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2lnbmF0dXJlOiBFdmVudFNpZ25hdHVyZSA9IEV2ZW50U2lnbmF0dXJlLmZyb20oc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9rKHNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHR5cGUgPT09IFwiZXh0ZXJuYWxcIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdG9yOiBTZWxlY3RvciA9IFNlbGVjdG9yLmZyb20obmFtZSwgLi4uX3BheWxvYWQudW53cmFwT3IoW10pKTtcclxuICAgICAgICAgICAgICAgIGlmIChfdmlzaWJpbGl0eS5ub25lKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2lnbmF0dXJlOiBFeHRlcm5hbFNpZ25hdHVyZSA9IEV4dGVybmFsU2lnbmF0dXJlLmZyb20oc2VsZWN0b3IpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPayhzaWduYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0IHZpc2liaWxpdHk6IFwicHVyZVwiIHwgXCJ2aWV3XCIgPSBfdmlzaWJpbGl0eS51bndyYXAoKTtcclxuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5ID09PSBcInB1cmVcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzaWduYXR1cmU6IEV4dGVybmFsUHVyZVNpZ25hdHVyZSA9IEV4dGVybmFsUHVyZVNpZ25hdHVyZS5mcm9tKHNlbGVjdG9yLCAuLi5fcmV0dXJucy51bndyYXBPcihbXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPayhzaWduYXR1cmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHkgPT09IFwidmlld1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHNpZ25hdHVyZTogRXh0ZXJuYWxWaWV3U2lnbmF0dXJlID0gRXh0ZXJuYWxWaWV3U2lnbmF0dXJlLmZyb20oc2VsZWN0b3IsIC4uLl9yZXR1cm5zLnVud3JhcE9yKFtdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9rKHNpZ25hdHVyZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEVycihcIlNJR05BVFVSRV9CVUlMREVSLkVSUl9NQUxGT1JNRURfU0lHTkFUVVJFXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgdHlwZSBTaWduYXR1cmVIYW5kbGVyID0ge1xyXG4gICAgICAgIG5hbWVPZihzaWduYXR1cmU6IFNpZ25hdHVyZSk6IE9wdGlvbjxzdHJpbmc+O1xyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgU2lnbmF0dXJlSGFuZGxlcjogU2lnbmF0dXJlSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgLyoqKi8ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBuYW1lT2YgfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG5hbWVPZihzaWduYXR1cmU6IFNpZ25hdHVyZSk6IE9wdGlvbjxzdHJpbmc+IHtcclxuICAgICAgICAgICAgbGV0IHNoYXJkczogQXJyYXk8c3RyaW5nPiA9IHNpZ25hdHVyZS5zcGxpdChcIiBcIik7XHJcbiAgICAgICAgICAgIGlmIChzaGFyZHMubGVuZ3RoID09PSAwKSByZXR1cm4gTm9uZTtcclxuICAgICAgICAgICAgbGV0IHN0cmluZzogT3B0aW9uPHN0cmluZz4gPSBmbGFnKHNoYXJkcy5hdCgxKSk7XHJcbiAgICAgICAgICAgIGlmIChzdHJpbmcubm9uZSgpKSByZXR1cm4gc3RyaW5nO1xyXG4gICAgICAgICAgICBsZXQgc3RyaW5nJDA6IHN0cmluZyA9IHN0cmluZy51bndyYXAoKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogT3B0aW9uPHN0cmluZz4gPSBmbGFnKFxyXG4gICAgICAgICAgICAgICAgc3RyaW5nJDBcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoXCIoXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgLmF0KDApXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIGlmIChyZXN1bHQubm9uZSgpKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0JDA6IHN0cmluZyA9IHJlc3VsdC51bndyYXAoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFNvbWUocmVzdWx0JDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXZlbnRTaWduYXR1cmUgPSBgZXZlbnQgJHsgc3RyaW5nIH0oJHsgc3RyaW5nIH0pYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFdmVudFNpZ25hdHVyZUhhbmRsZXIgPSB7XHJcbiAgICAgICAgZnJvbShzZWxlY3RvcjogU2VsZWN0b3IpOiBFdmVudFNpZ25hdHVyZTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IEV2ZW50U2lnbmF0dXJlOiBFdmVudFNpZ25hdHVyZUhhbmRsZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgIC8qKiovIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZnJvbSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZnJvbShzZWxlY3RvcjogU2VsZWN0b3IpOiBFdmVudFNpZ25hdHVyZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgZXZlbnQgJHsgc2VsZWN0b3IgfWA7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFeHRlcm5hbFB1cmVTaWduYXR1cmUgPSBgZnVuY3Rpb24gJHsgc3RyaW5nIH0oJHsgc3RyaW5nIH0pIGV4dGVybmFsIHB1cmUgcmV0dXJucyAoJHsgc3RyaW5nIH0pYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFeHRlcm5hbFB1cmVTaWduYXR1cmVIYW5kbGVyID0ge1xyXG4gICAgICAgIGZyb20oc2VsZWN0b3I6IFNlbGVjdG9yLCAuLi5kYXRhOiBBcnJheTxEYXRhPik6IEV4dGVybmFsUHVyZVNpZ25hdHVyZTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IEV4dGVybmFsUHVyZVNpZ25hdHVyZTogRXh0ZXJuYWxQdXJlU2lnbmF0dXJlSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgLyoqKi8ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBmcm9tIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmcm9tKHNlbGVjdG9yOiBTZWxlY3RvciwgLi4uZGF0YTogQXJyYXk8RGF0YT4pOiBFeHRlcm5hbFB1cmVTaWduYXR1cmUge1xyXG4gICAgICAgICAgICByZXR1cm4gYGZ1bmN0aW9uICR7IHNlbGVjdG9yIH0gZXh0ZXJuYWwgcHVyZSByZXR1cm5zICgkeyBTdHJpbmcuZnJvbSguLi5kYXRhKSB9KWA7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFeHRlcm5hbFZpZXdTaWduYXR1cmUgPSBgZnVuY3Rpb24gJHsgc3RyaW5nIH0oJHsgc3RyaW5nIH0pIGV4dGVybmFsIHZpZXcgcmV0dXJucyAoJHsgc3RyaW5nIH0pYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFeHRlcm5hbFZpZXdTaWduYXR1cmVIYW5kbGVyID0ge1xyXG4gICAgICAgIGZyb20oc2VsZWN0b3I6IFNlbGVjdG9yLCAuLi5kYXRhOiBBcnJheTxEYXRhPik6IEV4dGVybmFsVmlld1NpZ25hdHVyZTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IEV4dGVybmFsVmlld1NpZ25hdHVyZTogRXh0ZXJuYWxWaWV3U2lnbmF0dXJlSGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgLyoqKi8ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBmcm9tIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmcm9tKHNlbGVjdG9yOiBTZWxlY3RvciwgLi4uZGF0YTogQXJyYXk8RGF0YT4pOiBFeHRlcm5hbFZpZXdTaWduYXR1cmUge1xyXG4gICAgICAgICAgICByZXR1cm4gYGZ1bmN0aW9uICR7IHNlbGVjdG9yIH0gZXh0ZXJuYWwgdmlldyByZXR1cm5zICgkeyBTdHJpbmcuZnJvbSguLi5kYXRhKSB9KWA7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXh0ZXJuYWxTaWduYXR1cmUgPSBgZnVuY3Rpb24gJHsgc3RyaW5nIH0oJHsgc3RyaW5nIH0pIGV4dGVybmFsYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBFeHRlcm5hbFNpZ25hdHVyZUhhbmRsZXIgPSB7XHJcbiAgICAgICAgZnJvbShzZWxlY3RvcjogU2VsZWN0b3IpOiBFeHRlcm5hbFNpZ25hdHVyZTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IEV4dGVybmFsU2lnbmF0dXJlOiBFeHRlcm5hbFNpZ25hdHVyZUhhbmRsZXIgPSAoKCkgPT4ge1xyXG4gICAgICAgIC8qKiovIHtcclxuICAgICAgICAgICAgcmV0dXJuIHsgZnJvbSB9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZnJvbShzZWxlY3RvcjogU2VsZWN0b3IpOiBFeHRlcm5hbFNpZ25hdHVyZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgZnVuY3Rpb24gJHsgc2VsZWN0b3IgfSBleHRlcm5hbGA7XHJcbiAgICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcblxyXG4gICAgZXhwb3J0IHR5cGUgU2VsZWN0b3IgPSBgJHsgc3RyaW5nIH0oJHsgc3RyaW5nIH0pYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBTZWxlY3RvckhhbmRsZXIgPSB7XHJcbiAgICAgICAgZnJvbShuYW1lOiBzdHJpbmcsIC4uLmRhdGE6IEFycmF5PERhdGE+KTogU2VsZWN0b3I7IFxyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgY29uc3QgU2VsZWN0b3I6IFNlbGVjdG9ySGFuZGxlciA9ICgoKSA9PiB7XHJcbiAgICAgICAgLyoqKi8ge1xyXG4gICAgICAgICAgICByZXR1cm4geyBmcm9tIH07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmcm9tKG5hbWU6IHN0cmluZywgLi4uZGF0YTogQXJyYXk8RGF0YT4pOiBTZWxlY3RvciB7XHJcbiAgICAgICAgICAgIHJldHVybiBgJHsgbmFtZSB9KCR7IFN0cmluZy5mcm9tKC4uLmRhdGEpIH0pYDtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuXHJcbiAgICBleHBvcnQgdHlwZSBTdHJpbmcgPSB7XHJcbiAgICAgICAgZnJvbSguLi5kYXRhOiBBcnJheTxEYXRhPik6IHN0cmluZztcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IGNvbnN0IFN0cmluZzogU3RyaW5nID0gKCgpID0+IHtcclxuICAgICAgICAvKioqLyB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGZyb20gfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZyb20oLi4uZGF0YTogQXJyYXk8RGF0YT4pOiBzdHJpbmcge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpOiBiaWdpbnQgPSAwbjsgaSA8IGRhdGEubGVuZ3RoOyBpICsrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMG4pIHJlc3VsdCA9IFwiLCBcIjtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBkYXRhW051bWJlcihpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIFN0cnVjdERhdGEgPSBBcnJheTxEYXRhPjtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBEYXRhID1cclxuICAgICAgICB8IEFyaXRobWV0aWNEYXRhXHJcbiAgICAgICAgfCBCeXRlc0RhdGFcclxuICAgICAgICB8IEFkZHJlc3NEYXRhXHJcbiAgICAgICAgfCBCb29sZWFuRGF0YVxyXG4gICAgICAgIHwgU3RyaW5nRGF0YVxyXG4gICAgICAgIHwgQXJyYXlEYXRhXHJcbiAgICAgICAgfCBTdHJ1Y3REYXRhO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEFycmF5RGF0YSA9IGAkeyBcclxuICAgICAgICB8IEFyaXRobWV0aWNEYXRhIFxyXG4gICAgICAgIHwgQnl0ZXNEYXRhIFxyXG4gICAgICAgIHwgQWRkcmVzc0RhdGEgXHJcbiAgICAgICAgfCBCb29sZWFuRGF0YSBcclxuICAgICAgICB8IFN0cmluZ0RhdGEgfVtdYDtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBBZGRyZXNzRGF0YSA9IFwiYWRkcmVzc1wiO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEJvb2xlYW5EYXRhID0gXCJib29sXCI7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgU3RyaW5nRGF0YSA9IFwic3RyaW5nXCI7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgQXJpdGhtZXRpY0RhdGEgPSBcInVpbnRcIiB8IFwiaW50XCIgfCBgJHsgXCJ1aW50XCIgfCBcImludFwiIH0keyBBcml0aG1ldGljRGF0YUJpdFNpemUgfWA7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgQXJpdGhtZXRpY0RhdGFCaXRTaXplID0gXHJcbiAgICB8IFwiOFwiIFxyXG4gICAgfCBcIjE2XCIgfCBcIjI0XCIgfCBcIjMyXCIgXHJcbiAgICB8IFwiNDBcIiB8IFwiNDhcIiB8IFwiNTZcIiBcclxuICAgIHwgXCI2NFwiIHwgXCI3MlwiIHwgXCI4MFwiIFxyXG4gICAgfCBcIjg4XCIgfCBcIjk2XCIgXHJcbiAgICB8IFwiMTA0XCIgfCBcIjExMlwiIHwgXCIxMjBcIiBcclxuICAgIHwgXCIxMjhcIiB8IFwiMTM2XCIgfCBcIjE0NFwiIFxyXG4gICAgfCBcIjE1MlwiIHwgXCIxNjBcIiB8IFwiMTY4XCIgXHJcbiAgICB8IFwiMTc2XCIgfCBcIjE4NFwiIHwgXCIxOTJcIiBcclxuICAgIHwgXCIyMDBcIiB8IFwiMjA4XCIgfCBcIjIxNlwiIFxyXG4gICAgfCBcIjIyNFwiIHwgXCIyMzJcIiB8IFwiMjQwXCIgXHJcbiAgICB8IFwiMjQ4XCIgfCBcIjI1NlwiO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEJ5dGVzRGF0YSA9IFwiYnl0ZXNcIiB8IGBieXRlcyR7IEJ5dGVzRGF0YUJpdFNpemUgfWA7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgQnl0ZXNEYXRhQml0U2l6ZSA9IFxyXG4gICAgICAgIHwgXCIxXCIgfCBcIjJcIiB8IFwiM1wiIFxyXG4gICAgICAgIHwgXCI0XCIgfCBcIjVcIiB8IFwiNlwiIFxyXG4gICAgICAgIHwgXCI3XCIgfCBcIjhcIiB8IFwiOVwiIFxyXG4gICAgICAgIHwgXCIxMFwiIHwgXCIxMVwiIHwgXCIxMlwiIFxyXG4gICAgICAgIHwgXCIxM1wiIHwgXCIxNFwiIHwgXCIxNVwiIFxyXG4gICAgICAgIHwgXCIxNlwiIHwgXCIxN1wiIHwgXCIxOFwiIFxyXG4gICAgICAgIHwgXCIxOVwiIHwgXCIyMFwiIHwgXCIyMVwiIFxyXG4gICAgICAgIHwgXCIyMlwiIHwgXCIyM1wiIHwgXCIyNFwiIFxyXG4gICAgICAgIHwgXCIyNVwiIHwgXCIyNlwiIHwgXCIyN1wiIFxyXG4gICAgICAgIHwgXCIyOFwiIHwgXCIyOVwiIHwgXCIzMFwiIFxyXG4gICAgICAgIHwgXCIzMVwiIHwgXCIzMlwiO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEFic3RyYWN0QmluYXJ5SW50ZXJmYWNlID0gQXJyYXk8U2lnbmF0dXJlPiB8IEFycmF5PG9iamVjdD47XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgQnl0ZWNvZGUgPSBzdHJpbmc7XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgQWRkcmVzcyA9IGAweCR7IHN0cmluZyB9YDtcclxufSIsICIvLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBkZWZhdWx0IGFzIFNvbGMgfSBmcm9tIFwic29sY1wiO1xyXG5pbXBvcnQgeyBSZXN1bHQgYXMgUmVzdWx0JDAgfSBmcm9tIFwicmVsaXFcIjtcclxuaW1wb3J0IHsgT2sgfSBmcm9tIFwicmVsaXFcIjtcclxuaW1wb3J0IHsgVW5zYWZlIH0gZnJvbSBcInJlbGlxXCI7XHJcbmltcG9ydCB7IEV0aGVyZXVtVmlydHVhbE1hY2hpbmUgfSBmcm9tIFwiLi4vZXZtL2V2bS5idW5cIjtcclxuaW1wb3J0IHsgd3JhcCB9IGZyb20gXCJyZWxpcVwiO1xyXG5cclxuZXhwb3J0IHR5cGUgQ29tcGlsZXIgPSB7XHJcbiAgICBjb21waWxlKGNvbmZpZ3VyYXRpb246IENvbXBpbGVyLkNvbmZpZ3VyYXRpb24pOiBDb21waWxlci5SZXN1bHQ8Q29tcGlsZXIuT3V0cHV0PjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb21waWxlcigpOiBDb21waWxlciB7XHJcbiAgICAvKioqLyB7XHJcbiAgICAgICAgcmV0dXJuIHsgY29tcGlsZSB9O1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbXBpbGUoY29uZmlndXJhdGlvbjogQ29tcGlsZXIuQ29uZmlndXJhdGlvbik6IENvbXBpbGVyLlJlc3VsdDxDb21waWxlci5PdXRwdXQ+IHtcclxuICAgICAgICBsZXQgY29uZmlndXJhdGlvbiQwOiBSZXN1bHQkMDxzdHJpbmcsIFVuc2FmZT4gPSB3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGNvbmZpZ3VyYXRpb24pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb25maWd1cmF0aW9uJDAuZXJyKCkpIHJldHVybiBjb25maWd1cmF0aW9uJDA7XHJcbiAgICAgICAgbGV0IGNvbmZpZ3VyYXRpb24kMTogc3RyaW5nID0gY29uZmlndXJhdGlvbiQwLnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBjb250ZW50OiBSZXN1bHQkMDxzdHJpbmcsIFVuc2FmZT4gPSB3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIFNvbGMuY29tcGlsZShjb25maWd1cmF0aW9uJDEpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmIChjb250ZW50LmVycigpKSByZXR1cm4gY29udGVudDtcclxuICAgICAgICBsZXQgY29udGVudCQwOiBzdHJpbmcgPSBjb250ZW50LnVud3JhcCgpO1xyXG4gICAgICAgIGxldCBvdXQ6IFJlc3VsdCQwPHVua25vd24sIFVuc2FmZT4gPSB3cmFwKCgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoY29udGVudCQwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAob3V0LmVycigpKSByZXR1cm4gb3V0O1xyXG4gICAgICAgIGxldCBvdXQkMDogdW5rbm93biA9IG91dC51bndyYXAoKTtcclxuICAgICAgICByZXR1cm4gT2soKG91dCQwIGFzIENvbXBpbGVyLk91dHB1dCkpO1xyXG4gICAgfSAgICBcclxufVxyXG5cclxuZXhwb3J0IG5hbWVzcGFjZSBDb21waWxlciB7XHJcbiAgICBleHBvcnQgdHlwZSBDb25maWd1cmF0aW9uID0ge1xyXG4gICAgICAgIGxhbmd1YWdlOiBcIlNvbGlkaXR5XCIgfCBcIlZ5cGVyXCIgfCBcImxsbFwiIHwgXCJhc3NlbWJseVwiO1xyXG4gICAgICAgIHNvdXJjZXM6IHtcclxuICAgICAgICAgICAgW2NvbnRyYWN0OiBzdHJpbmddOiB7XHJcbiAgICAgICAgICAgICAgICBrZWNjYWsyNTY/OiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB1cmxzPzogQXJyYXk8c3RyaW5nPjtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQ/OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgICAgICBzZXR0aW5ncz86IHtcclxuICAgICAgICAgICAgcmVtYXBwaW5ncz86IEFycmF5PHN0cmluZz47XHJcbiAgICAgICAgICAgIG9wdGltaXplcj86IHtcclxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IGJvb2xlYW47XHJcbiAgICAgICAgICAgICAgICBydW5zOiBudW1iZXI7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGV2bVZlcnNpb24/OiBcclxuICAgICAgICAgICAgICAgIHwgXCJob21lc3RlYWRcIiBcclxuICAgICAgICAgICAgICAgIHwgXCJ0YW5nZXJpbmVXaGlzdGxlXCIgXHJcbiAgICAgICAgICAgICAgICB8IFwic3B1cmlvdXNEcmFnb25cIiBcclxuICAgICAgICAgICAgICAgIHwgXCJieXphbnRpdW1cIiBcclxuICAgICAgICAgICAgICAgIHwgXCJjb25zdGFudGlub3BsZVwiIFxyXG4gICAgICAgICAgICAgICAgfCBcInBldGVyc2J1cmdcIiBcclxuICAgICAgICAgICAgICAgIHwgXCJpc3RhbmJ1bFwiIFxyXG4gICAgICAgICAgICAgICAgfCBcImJlcmxpblwiIFxyXG4gICAgICAgICAgICAgICAgfCBcImxvbmRvblwiO1xyXG4gICAgICAgICAgICBtZXRhZGF0YT86IHtcclxuICAgICAgICAgICAgICAgIHVzZUxpdGVyYWxDb250ZW50OiBib29sZWFuO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBsaWJyYXJpZXM/OiB7XHJcbiAgICAgICAgICAgICAgICBbZmlsZU5hbWU6IHN0cmluZ106IHtcclxuICAgICAgICAgICAgICAgICAgICBbbGlicmFyeTogc3RyaW5nXTogc3RyaW5nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdXRwdXRTZWxlY3Rpb24/OiB7XHJcbiAgICAgICAgICAgICAgICBcIipcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiKlwiOiBBcnJheTxcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImFiaVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJhc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8IFwibGVnYWN5QVNUXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImRldmRvY1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJ1c2VyZG9jXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcIm1ldGFkYXRhXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImlyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImV2bS5hc3NlbWJseVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJldm0ubGVnYWN5QXNzZW1ibHlcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8IFwiZXZtLmJ5dGVjb2RlLm9iamVjdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJldm0uYnl0ZWNvZGUub3Bjb2Rlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJldm0uYnl0ZWNvZGUuc291cmNlTWFwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImV2bS5ieXRlY29kZS5saW5rUmVmZXJlbmNlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJldm0ubWV0aG9kSWRlbnRpZmllcnNcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB8IFwiZXZtLmdhc0VzdGltYXRlc1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHwgXCJld2FzbS53YXN0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfCBcImV3YXNtLndhc21cIj47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIE91dHB1dCA9IHtcclxuICAgICAgICBlcnJvcnM/OiBBcnJheTxFcnJvcj47XHJcbiAgICAgICAgc291cmNlcz86IHtcclxuICAgICAgICAgICAgW2ZpbGVOYW1lOiBzdHJpbmddOiBTb3VyY2VPdXRwdXQ7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb250cmFjdHM/OiB7XHJcbiAgICAgICAgICAgIFtmaWxlTmFtZTogc3RyaW5nXToge1xyXG4gICAgICAgICAgICAgICAgW2NvbnRyYWN0OiBzdHJpbmddOiBDb250cmFjdE91dHB1dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIENvbnRyYWN0T3V0cHV0ID0ge1xyXG4gICAgICAgIGFiaT86IEFycmF5PG9iamVjdD47XHJcbiAgICAgICAgbWV0YWRhdGE/OiBzdHJpbmc7XHJcbiAgICAgICAgdXNlcmRvYz86IG9iamVjdDtcclxuICAgICAgICBkZXZkb2M/OiBvYmplY3Q7XHJcbiAgICAgICAgaXI/OiBzdHJpbmc7XHJcbiAgICAgICAgZXZtPzogRXZtT3V0cHV0O1xyXG4gICAgICAgIGV3YXNtPzoge1xyXG4gICAgICAgICAgICB3YXN0Pzogc3RyaW5nO1xyXG4gICAgICAgICAgICB3YXNtPzogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICB9O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEV2bU91dHB1dCA9IHtcclxuICAgICAgICBhc3NlbWJseT86IHN0cmluZztcclxuICAgICAgICBsZWdhY3lBc3NlbWJseT86IG9iamVjdDtcclxuICAgICAgICBieXRlY29kZT86IEJ5dGVjb2RlO1xyXG4gICAgICAgIGRlcGxveWVkQnl0ZWNvZGU/OiBCeXRlY29kZTtcclxuICAgICAgICBtZXRob2RJZGVudGlmaWVycz86IHtcclxuICAgICAgICAgICAgW3NlbGVjdG9yOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlNlbGVjdG9yXTogc3RyaW5nO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZ2FzRXN0aW1hdGVzPzoge1xyXG4gICAgICAgICAgICBjcmVhdGlvbj86IHtcclxuICAgICAgICAgICAgICAgIGNvZGVEZXBvc2l0Q29zdD86IHN0cmluZztcclxuICAgICAgICAgICAgICAgIGV4ZWN1dGlvbkNvc3Q/OiBzdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB0b3RhbENvc3Q/OiBzdHJpbmc7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGV4dGVybmFsPzoge1xyXG4gICAgICAgICAgICAgICAgW3NlbGVjdG9yOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlNlbGVjdG9yXTogc3RyaW5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGludGVybmFsPzoge1xyXG4gICAgICAgICAgICAgICAgW3NlbGVjdG9yOiBFdGhlcmV1bVZpcnR1YWxNYWNoaW5lLlNlbGVjdG9yXTogc3RyaW5nXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgUmVzdWx0PFQxPiA9IFJlc3VsdCQwPFQxLCBVbnNhZmU+O1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEVycm9yID0ge1xyXG4gICAgICAgIHNvdXJjZUxvY2F0aW9uPzogU291cmNlTG9jYXRpb247XHJcbiAgICAgICAgdHlwZTogRXJyb3JDb2RlO1xyXG4gICAgICAgIGNvbXBvbmVudDogc3RyaW5nO1xyXG4gICAgICAgIHNldmVyaXR5OiBcImVycm9yXCIgfCBcIndhcm5pbmdcIjtcclxuICAgICAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbiAgICAgICAgZm9ybWF0dGVkTWVzc2FnZT86IHN0cmluZztcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgRXJyb3JDb2RlID1cclxuICAgICAgICB8IFwiSlNPTkVycm9yXCJcclxuICAgICAgICB8IFwiSU9FcnJvclwiXHJcbiAgICAgICAgfCBcIlBhcnNlckVycm9yXCJcclxuICAgICAgICB8IFwiRG9jc3RyaW5nUGFyc2luZ0Vycm9yXCJcclxuICAgICAgICB8IFwiU3ludGF4RXJyb3JcIlxyXG4gICAgICAgIHwgXCJEZWNsYXJhdGlvbkVycm9yXCJcclxuICAgICAgICB8IFwiVHlwZUVycm9yXCJcclxuICAgICAgICB8IFwiVW5pbXBsZW1lbnRlZEZlYXR1cmVFcnJvclwiXHJcbiAgICAgICAgfCBcIkludGVybmFsQ29tcGlsZXJFcnJvclwiXHJcbiAgICAgICAgfCBcIkV4Y2VwdGlvblwiXHJcbiAgICAgICAgfCBcIkNvbXBpbGVyRXJyb3JcIlxyXG4gICAgICAgIHwgXCJGYXRhbEVycm9yXCJcclxuICAgICAgICB8IFwiV2FybmluZ1wiO1xyXG5cclxuICAgIGV4cG9ydCB0eXBlIEJ5dGVjb2RlID0ge1xyXG4gICAgICAgIG9iamVjdD86IHN0cmluZztcclxuICAgICAgICBvcGNvZGVzPzogc3RyaW5nO1xyXG4gICAgICAgIHNvdXJjZU1hcD86IHN0cmluZztcclxuICAgICAgICBsaW5rUmVmZXJlbmNlcz86IHtcclxuICAgICAgICAgICAgW2ZpbGVOYW1lOiBzdHJpbmddOiB7XHJcbiAgICAgICAgICAgICAgICBbbGlicmFyeTogc3RyaW5nXTogQXJyYXk8e1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICAgICAgICAgICAgICB9PjtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9O1xyXG4gICAgfTtcclxuXHJcbiAgICBleHBvcnQgdHlwZSBTb3VyY2VMb2NhdGlvbiA9IHtcclxuICAgICAgICBmaWxlOiBzdHJpbmc7XHJcbiAgICAgICAgc3RhcnQ6IG51bWJlcjtcclxuICAgICAgICBlbmQ6IG51bWJlcjtcclxuICAgIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgU291cmNlT3V0cHV0ID0ge1xyXG4gICAgICAgIGlkOiBudW1iZXI7XHJcbiAgICAgICAgYXN0OiBvYmplY3Q7XHJcbiAgICAgICAgbGVnYWN5QVNUPzogb2JqZWN0O1xyXG4gICAgfTtcclxuICAgIFxyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOzs7QUNBQSxvQkFBb0M7QUFDcEMsSUFBQUEsaUJBQXdD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QjtBQUMzQjtBQUNGLFdBQU8sRUFBRSxRQUFRO0FBQUEsRUFDckI7QUFFQSxXQUFTLFFBQVEsZUFBeUU7QUFDdEYsUUFBSSxzQkFBNEMscUJBQUssTUFBTTtBQUN2RCxhQUFPLEtBQUssVUFBVSxhQUFhO0FBQUEsSUFDdkMsQ0FBQztBQUNELFFBQUksZ0JBQWdCLElBQUksRUFBRyxRQUFPO0FBQ2xDLFFBQUksa0JBQTBCLGdCQUFnQixPQUFPO0FBQ3JELFFBQUksY0FBb0MscUJBQUssTUFBTTtBQUMvQyxhQUFPLFlBQUFDLFFBQUssUUFBUSxlQUFlO0FBQUEsSUFDdkMsQ0FBQztBQUNELFFBQUksUUFBUSxJQUFJLEVBQUcsUUFBTztBQUMxQixRQUFJLFlBQW9CLFFBQVEsT0FBTztBQUN2QyxRQUFJLFVBQWlDLHFCQUFLLE1BQU07QUFDNUMsYUFBTyxLQUFLLE1BQU0sU0FBUztBQUFBLElBQy9CLENBQUM7QUFDRCxRQUFJLElBQUksSUFBSSxFQUFHLFFBQU87QUFDdEIsUUFBSSxRQUFpQixJQUFJLE9BQU87QUFDaEMsZUFBTyxtQkFBSSxLQUF5QjtBQUFBLEVBQ3hDO0FBQ0o7IiwKICAibmFtZXMiOiBbImltcG9ydF9ldGhlcnMiLCAiaW1wb3J0X3JlbGlxIiwgImVycm9yIiwgIkV0aGVyZXVtVmlydHVhbE1hY2hpbmUiLCAibmFtZSIsICJpbXBvcnRfcmVsaXEiLCAiaW1wb3J0X3JlbGlxIiwgIlNvbGMiXQp9Cg==