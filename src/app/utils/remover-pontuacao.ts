export function removerPontuacao(value: string): string {
  return value.replace(/\D/g, '');
}