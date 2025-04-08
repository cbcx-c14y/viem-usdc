"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var viem_1 = require("viem");
var chains_1 = require("viem/chains");
var USDC_CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
var TRANSFER_EVENT_ABI = (0, viem_1.parseAbiItem)('event Transfer(address indexed from, address indexed to, uint256 value)');
function fetchUSDCTransfers() {
    return __awaiter(this, void 0, void 0, function () {
        var client, latestBlock, startBlock, logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = (0, viem_1.createPublicClient)({
                        chain: chains_1.mainnet,
                        transport: (0, viem_1.http)(),
                    });
                    return [4 /*yield*/, client.getBlockNumber()];
                case 1:
                    latestBlock = _a.sent();
                    startBlock = latestBlock - 100n;
                    return [4 /*yield*/, client.getLogs({
                            address: USDC_CONTRACT_ADDRESS,
                            event: TRANSFER_EVENT_ABI,
                            fromBlock: startBlock,
                            toBlock: latestBlock,
                        })];
                case 2:
                    logs = _a.sent();
                    logs.forEach(function (log) {
                        var args = log.args, transactionHash = log.transactionHash;
                        var from = args.from;
                        var to = args.to;
                        var value = Number(args.value) / 1e6;
                        console.log("\u4ECE ".concat(from, " \u8F6C\u8D26\u7ED9 ").concat(to, " ").concat(value.toFixed(5), " USDC ,\u4EA4\u6613ID\uFF1A").concat(transactionHash));
                    });
                    return [2 /*return*/];
            }
        });
    });
}
fetchUSDCTransfers().catch(function (error) {
    console.error('Error transfers:', error);
});
