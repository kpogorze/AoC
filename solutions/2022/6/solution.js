const solution = (n) => (s) => {
  for (let i = n; i <= s.length; i++) {
    const set = new Set(s.substr(i - n, n));
    if (set.size === n) return i;
  }
};

export const first = solution(4);
export const second = solution(14);
