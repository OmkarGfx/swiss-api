import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabaseClient'
import { Database } from '../lib/supabase'

type Tables = Database['public']['Tables']
type TableName = keyof Tables

export function useSupabaseQuery<T extends TableName>(
  table: T,
  queryFn?: (query: any) => any
) {
  const [data, setData] = useState<Tables[T]['Row'][] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        let query = supabase.from(table).select('*')
        
        if (queryFn) {
          query = queryFn(query)
        }
        
        const { data: result, error: queryError } = await query
        
        if (queryError) {
          setError(queryError.message)
        } else {
          setData(result)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [table])

  return { data, loading, error }
}

export function useSupabaseMutation<T extends TableName>(table: T) {
  const [loading, setLoading] = useState(false)

  const insert = async (data: Tables[T]['Insert']) => {
    setLoading(true)
    try {
      const result = await supabase.from(table).insert(data).select().single()
      return result
    } finally {
      setLoading(false)
    }
  }

  const update = async (id: string, data: Tables[T]['Update']) => {
    setLoading(true)
    try {
      const result = await supabase.from(table).update(data).eq('id', id).select().single()
      return result
    } finally {
      setLoading(false)
    }
  }

  const remove = async (id: string) => {
    setLoading(true)
    try {
      const result = await supabase.from(table).delete().eq('id', id)
      return result
    } finally {
      setLoading(false)
    }
  }

  return { insert, update, remove, loading }
}
