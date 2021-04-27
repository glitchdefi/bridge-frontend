
export const GG_TOKEN = "6LflJ0QaAAAAAOOdRJd2P__DWDfyPEAdtnMv9a8D";

export const buyIdoContractState = {
  approving: "APPROVING",
  approved: "APPROVED",
  approveFailed: "APPROVE_FAILED",
  buying: "BUYING",
  buySuccess: "BUY_SUCCESS",
  buyFailed: "BUY_FAILED",
};

export const extensionName = {
  metamask: "METAMASK",
  binanceExtension: "BINANCE_EXTENSION",
  trustWallet: "TRUST_WALLET",
};

export const WITHDRAW_STATUS = {
  WAITING_ADMIN_CONFIRM: "WC", //đợi admin duyệt
  WAITING_VERIFY_AGAIN: "WV", //admin đã duyệt -> cần user xác nhận rút lần cuối qua email
  PENDING: "P", //admin đã duyệt + user đã xác nhận lần 2 -> đợi trả -> đẩy lên queue thành công
  PROCESSING: "PC", //tiến hành trả
  COMPLETED: "C", //rút hoàn thành
  CANCELLED: "CL", //user ko confirm
  FAILED: "F", //rút failed
  PUSH_QUEUE_FAILED: "PQF", //đẩy lên queue failed
  ADMIN_CANCELLED: "AC", //admin ko cho rút
};

export const address0 = "0x0000000000000000000000000000000000000000";


export const GATE_WAY = {
  "RE_INVEST": 'ReInvestment',
  "BINANCE":"BINANCE SMART CHAIN",
  "UNW":"UNW"
}

