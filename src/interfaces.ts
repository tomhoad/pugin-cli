interface Division {
  Title: string;
  DivisionId: number;
  AyeCount: number;
  NoCount: number;
  Date: string;
  Ayes: Member[];
  Noes: Member[];
}

interface Member {
  MemberId: number;
  Name: string;
  Party: string;
  SubParty: string;
  PartyColour: string;
  PartyAbbreviation: string;
  MemberFrom: string;
  ListAs: string;
  ProxyName: string;
}

export { Division, Member };
