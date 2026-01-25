export const calculatePageButtons = (
  current: number,
  total: number,
  amount: number = 3
) => {
  const showAmount = amount

  let start = Math.max(1, current - 1)
  if (start + showAmount > total) {
    start = Math.max(1, total - showAmount)
  }

  const badges = []
  for (let i = 0; i < showAmount && start + i <= total; i++) {
    badges.push(start + i)
  }

  return badges
}
