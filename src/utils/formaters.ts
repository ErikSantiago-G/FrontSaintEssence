export const formatCurrency = (amount: number | undefined): string =>
  amount != null ? `$${amount.toFixed(2)}` : "$0.00";

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
