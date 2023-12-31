export type CreateUserPayload = {
  name: string;
  email: string;
  password: string;
};

export type SignInPayload = {
  email: string;
  password: string;
};

export type MatchList = {
  matches: {
    id: number;
    name: string;
    location: string;
    sportName: string;
    endsAt: string;
    isRunning: false;
    teams: {
      id: number;
      name: string;
    }[];
  }[];
};

export type Match = {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string;
  endsAt: string;
  score: {
    [key: string]: number;
  };
  teams: {
    id: number;
    name: string;
  }[];
  sportName: string;
  playingTeam: number;
  story: string;
};
export type Sport = {
  id: number;
  name: string;
};

export type SportList = {
  sports: Sport[];
};

export type Article = {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  summary: string;
  teams: {
    id: number;
    name: string;
  }[];
};

export type ArticleList = Article[];

export type ArticleDetail = {
  id: number;
  title: string;
  summary: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  teams: {
    id: number;
    name: string;
  }[];
};

export type Team = {
  id: number;
  name: string;
  plays: string;
};

export type Teams = Team[];

export type UserPreferences = {
  preferences: {
    favoriteSports: number[];
    favoriteTeams: number[];
  };
};
