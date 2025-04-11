export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          slug: string
          description: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          id: number
          title: string
          slug: string
          app_name: string
          description: string
          code: string
          link: string | null
          category_id: number
          user_id: string | null
          is_featured: boolean
          views: number
          created_at: string
          image_url: string | null
        }
        Insert: {
          id?: number
          title: string
          slug: string
          app_name: string
          description: string
          code: string
          link?: string | null
          category_id: number
          user_id?: string | null
          is_featured?: boolean
          views?: number
          created_at?: string
          image_url?: string | null
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          app_name?: string
          description?: string
          code?: string
          link?: string | null
          category_id?: number
          user_id?: string | null
          is_featured?: boolean
          views?: number
          created_at?: string
          image_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "referrals_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Category = Database['public']['Tables']['categories']['Row'];
export type Referral = Database['public']['Tables']['referrals']['Row'];
