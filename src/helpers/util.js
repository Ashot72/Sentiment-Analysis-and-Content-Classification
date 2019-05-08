export const mapRating = score => {
  if (score >= -1 && score < -0.8) return 0.5
  if (score >= -0.8 && score < -0.6) return 1
  if (score >= -0.6 && score < -0.4) return 1.5
  if (score >= -0.4 && score < -0.2) return 2
  if (score >= -0.2 && score < 0.0) return 2.5
  if (score >= 0.0 && score < 0.2) return 3
  if (score >= 0.2 && score < 0.4) return 3.5
  if (score >= 0.4 && score < 0.6) return 4
  if (score >= 0.6 && score < 0.8) return 4.5
  if (score >= 0.8 && score <= 1) return 5
}
