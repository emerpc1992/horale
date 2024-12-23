export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          username: string;
          password: string;
          role: 'admin' | 'user';
          created_at: string;
        };
        Insert: {
          id?: string;
          username: string;
          password: string;
          role: 'admin' | 'user';
          created_at?: string;
        };
        Update: {
          id?: string;
          username?: string;
          password?: string;
          role?: 'admin' | 'user';
          created_at?: string;
        };
      };
      // Add other table types as needed
    };
  };
}