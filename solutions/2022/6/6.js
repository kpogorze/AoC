const solution = (s, n) => {
  for (let i = n; i <= s.length; i++) {
    const set = new Set(s.substr(i - n, n));
    if (set.size === n) return i;
  }
};
