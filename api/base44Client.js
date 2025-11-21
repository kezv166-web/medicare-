import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

class Base44Client {
  constructor() {
    this.supabase = supabase;
  }

  auth = {
    me: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      return data || user;
    },

    updateMe: async (updates) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    }
  };

  entities = {
    Medicine: {
      list: async (orderBy = '-created_date', limit = 50) => {
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from('medicines').select('*');

        if (user) {
          query = query.eq('user_id', user.id);
        }

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },

      filter: async (filters, orderBy = '-created_date', limit = 50) => {
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from('medicines').select('*');

        if (user) {
          query = query.eq('user_id', user.id);
        }

        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },

      create: async (medicineData) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('medicines')
          .insert({ ...medicineData, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      update: async (id, updates) => {
        const { data, error } = await supabase
          .from('medicines')
          .update(updates)
          .eq('id', id)
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      delete: async (id) => {
        const { error } = await supabase
          .from('medicines')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      }
    },

    FoodRecommendation: {
      list: async (orderBy = 'name', limit = 100) => {
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from('food_recommendations').select('*');

        if (user) {
          query = query.eq('user_id', user.id);
        }

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },

      create: async (foodData) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('food_recommendations')
          .insert({ ...foodData, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        return data;
      }
    },

    Prescription: {
      list: async (orderBy = '-created_date', limit = 20) => {
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from('prescriptions').select('*');

        if (user) {
          query = query.eq('user_id', user.id);
        }

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },

      create: async (prescriptionData) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('prescriptions')
          .insert({ ...prescriptionData, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      delete: async (id) => {
        const { error } = await supabase
          .from('prescriptions')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      }
    },

    HealthReport: {
      list: async (orderBy = '-created_date', limit = 20) => {
        const { data: { user } } = await supabase.auth.getUser();
        let query = supabase.from('health_reports').select('*');

        if (user) {
          query = query.eq('user_id', user.id);
        }

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      },

      create: async (reportData) => {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('health_reports')
          .insert({ ...reportData, user_id: user.id })
          .select()
          .single();
        if (error) throw error;
        return data;
      },

      delete: async (id) => {
        const { error } = await supabase
          .from('health_reports')
          .delete()
          .eq('id', id);
        if (error) throw error;
        return true;
      }
    },

    Disease: {
      list: async (orderBy = 'name', limit = 100) => {
        let query = supabase.from('diseases').select('*');

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      }
    },

    MedicineInfo: {
      list: async (orderBy = 'name', limit = 100) => {
        let query = supabase.from('medicine_info').select('*');

        if (orderBy.startsWith('-')) {
          query = query.order(orderBy.substring(1), { ascending: false });
        } else {
          query = query.order(orderBy, { ascending: true });
        }

        query = query.limit(limit);
        const { data, error } = await query;
        if (error) throw error;
        return data || [];
      }
    }
  };

  integrations = {
    Core: {
      UploadFile: async ({ file }) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `uploads/${fileName}`;

        const { data, error } = await supabase.storage
          .from('files')
          .upload(filePath, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('files')
          .getPublicUrl(filePath);

        return { file_url: publicUrl };
      },

      InvokeLLM: async ({ prompt, response_json_schema, add_context_from_internet = false }) => {
        const response = await fetch(`${supabaseUrl}/functions/v1/invoke-llm`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            prompt,
            response_json_schema,
            add_context_from_internet
          })
        });

        if (!response.ok) {
          throw new Error('LLM invocation failed');
        }

        const data = await response.json();
        return typeof data === 'string' ? data : data.response || data;
      }
    }
  };
}

export const base44 = new Base44Client();
