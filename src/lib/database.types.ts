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
          description: string | null
          created_at: string
          slug: string | null
          icon: string | null
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
          slug?: string | null
          icon?: string | null
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
          slug?: string | null
          icon?: string | null
        }
        Relationships: []
      }
      referral_codes: {
        Row: {
          id: number
          app_name: string
          code: string
          description: string | null
          url: string
          user_benefit: string | null
          referrer_benefit: string | null
          category_id: number
          created_at: string
          views: number
          icon: string | null
          slug: string | null
          meta_title: string | null
          screenshots: string[] | null
        }
        Insert: {
          id?: number
          app_name: string
          code: string
          description?: string | null
          url: string
          user_benefit?: string | null
          referrer_benefit?: string | null
          category_id: number
          created_at?: string
          views?: number
          icon?: string | null
          slug?: string | null
          meta_title?: string | null
          screenshots?: string[] | null
        }
        Update: {
          id?: number
          app_name?: string
          code?: string
          description?: string | null
          url?: string
          user_benefit?: string | null
          referrer_benefit?: string | null
          category_id?: number
          created_at?: string
          views?: number
          icon?: string | null
          slug?: string | null
          meta_title?: string | null
          screenshots?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "referral_codes_category_id_fkey"
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
