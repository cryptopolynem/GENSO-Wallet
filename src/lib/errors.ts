/**
 * wagmi/viemのエラーからユーザー向けの短いメッセージを取り出す。
 * viemのエラーは `shortMessage` に人間が読みやすい要約が入っていることが多く、
 * `message` にはRPCへのリクエスト引数などの詳細情報まで含まれ長くなりがちなため、
 * 可能な限り `shortMessage` を優先する。詳細はコンソールに出力し調査できるようにする。
 */
export function getErrorMessage(error: unknown): string {
  if (!error) return "不明なエラーが発生しました";

  // eslint-disable-next-line no-console
  console.error(error);

  if (typeof error === "object" && error !== null) {
    const err = error as { shortMessage?: string; message?: string; details?: string };
    if (err.shortMessage) return err.shortMessage;
    if (err.message) return err.message.slice(0, 160);
  }

  return String(error).slice(0, 160);
}

/** MetaMask等のJSON-RPCエラーコードから、よくある原因の補足説明を返す */
export function getErrorHint(error: unknown): string | null {
  if (typeof error !== "object" || error === null) return null;
  const err = error as { code?: number; message?: string; shortMessage?: string };
  const text = `${err.message ?? ""} ${err.shortMessage ?? ""}`;

  if (text.includes("Unauthorized") || text.includes("JSON-RPC protocol")) {
    return "MetaMaskに設定されているこのネットワークのRPCが認証エラーを返しています。MetaMaskの「設定 > ネットワーク」でRPC URLを見直すか、別のRPCに変更してください。";
  }
  if (err.code === -32002 || text.includes("Resource unavailable") || text.includes("already pending")) {
    return "MetaMaskで別のリクエストが処理待ちになっている可能性があります。MetaMaskの拡張機能アイコンを確認し、保留中のポップアップがあれば処理してから再度お試しください。";
  }
  if (err.code === 4001 || text.includes("User rejected")) {
    return "MetaMask側でリクエストがキャンセルされました。";
  }
  if (err.code === 4902 || text.includes("Unrecognized chain")) {
    return "MetaMaskにこのネットワークが追加されていません。ネットワーク切替時の追加ダイアログを承認してください。";
  }
  if (text.includes("insufficient funds")) {
    return "ガス代（POL）が不足している可能性があります。";
  }
  return null;
}
