export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      counter_orders: {
        Row: {
          created_at: string
          customer_name: string
          customer_whatsapp: string
          id: string
          payment_method: string
          proof_image_url: string | null
          status: string | null
          total_paid: number
        }
        Insert: {
          created_at?: string
          customer_name: string
          customer_whatsapp: string
          id?: string
          payment_method: string
          proof_image_url?: string | null
          status?: string | null
          total_paid: number
        }
        Update: {
          created_at?: string
          customer_name?: string
          customer_whatsapp?: string
          id?: string
          payment_method?: string
          proof_image_url?: string | null
          status?: string | null
          total_paid?: number
        }
        Relationships: []
      }
      custom_cake_orders: {
        Row: {
          created_at: string
          customer_name: string
          customer_whatsapp: string
          dedication_text: string | null
          delivery_date: string
          deposit_paid: number
          flavor_chosen: string | null
          id: string
          portions: number | null
          reference_photo_url: string | null
          status: string | null
          total_price: number
        }
        Insert: {
          created_at?: string
          customer_name: string
          customer_whatsapp: string
          dedication_text?: string | null
          delivery_date: string
          deposit_paid: number
          flavor_chosen?: string | null
          id?: string
          portions?: number | null
          reference_photo_url?: string | null
          status?: string | null
          total_price: number
        }
        Update: {
          created_at?: string
          customer_name?: string
          customer_whatsapp?: string
          dedication_text?: string | null
          delivery_date?: string
          deposit_paid?: number
          flavor_chosen?: string | null
          id?: string
          portions?: number | null
          reference_photo_url?: string | null
          status?: string | null
          total_price?: number
        }
        Relationships: []
      }
      event_bookings: {
        Row: {
          client_name: string
          client_whatsapp: string
          created_at: string
          deposit_paid: number
          event_address: string
          event_date: string
          id: string
          package_name: string
          status: string | null
          total_price: number
        }
        Insert: {
          client_name: string
          client_whatsapp: string
          created_at?: string
          deposit_paid: number
          event_address: string
          event_date: string
          id?: string
          package_name: string
          status?: string | null
          total_price: number
        }
        Update: {
          client_name?: string
          client_whatsapp?: string
          created_at?: string
          deposit_paid?: number
          event_address?: string
          event_date?: string
          id?: string
          package_name?: string
          status?: string | null
          total_price?: number
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          is_active: boolean | null
          name: string
          price: number
          stock_count: number | null
        }
        Insert: {
          id?: string
          is_active?: boolean | null
          name: string
          price: number
          stock_count?: number | null
        }
        Update: {
          id?: string
          is_active?: boolean | null
          name?: string
          price?: number
          stock_count?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      realizar_pedido: {
        Args: { p_customer_name: string; p_items: Json }
        Returns: undefined
      }
    }
    Enums: {
      custom_cake_status:
        | "held_24h"
        | "deposit_verified"
        | "baking"
        | "ready_for_pickup"
        | "delivered"
        | "cancelled"
      event_status: "held_24h" | "deposit_verified" | "completed" | "cancelled"
      order_status_type: "pending" | "baking" | "ready" | "delivered"
      payment_method_type: "cash" | "spei" | "codi"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      custom_cake_status: [
        "held_24h",
        "deposit_verified",
        "baking",
        "ready_for_pickup",
        "delivered",
        "cancelled",
      ],
      event_status: ["held_24h", "deposit_verified", "completed", "cancelled"],
      order_status_type: ["pending", "baking", "ready", "delivered"],
      payment_method_type: ["cash", "spei", "codi"],
    },
  },
} as const
