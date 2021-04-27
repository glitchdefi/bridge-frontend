


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
export const TOKEN_NAME = {
  eth:'GLCH',
  bsc:'GLCH'
}


