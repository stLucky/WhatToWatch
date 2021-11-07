export type User = {
  id: number,
  name: string
}

export type ReviewType = {
  id: number,
  user: User
  rating: number,
  comment: string,
  date: string
}

export type ReviewSend = Omit<ReviewType, 'id' | 'user' | 'date'>;

export type ReviewsType = ReviewType[]
