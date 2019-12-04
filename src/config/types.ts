export enum BallotBoxType {
  Error = -1,
  Unset = 0,
  Cast = 1,
  Spoil = 2,
}

export interface BallotBoxContextInterface {
  isLiveMode: boolean
  setType: (type: BallotBoxType) => void
  type: BallotBoxType
  setCount: (count: number) => void
  count: number
  eject: () => void
  reset: () => void
}

export default {}
