import { useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useClients } from '@/sections/shared/hooks/useClients'
import { Layout } from '@/components/Layout'
import { ClientForm, ClientList } from '.'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AlertCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function ClientsPage() {
  const { page } = useParams()
  const {
    clients,
    selectedClient,
    visibleForm,
    isLoading,
    fetchClients,
    onOpenForm,
    onCloseForm
  } = useClients()

  // useEffect(() => {
  //   fetchClients()
  // }, [ page])

  const memoizedFetchClients = useCallback(fetchClients, [fetchClients])

  useEffect(() => {
    let isSubscribed = true;
    const loadUsers = async () => {
      if (isSubscribed) {
        await memoizedFetchClients();
      }
    };
    loadUsers();
    return () => {
      isSubscribed = false;
    };
  }, [memoizedFetchClients, page]);

  if (isLoading) {
    return (
      <div className="w-[95%] absolute mt-40 top-14 flex flex-col space-y-3 justify-center items-center text-center text-slate-500 lg:w-[75%] lg:left-72">
        <Skeleton className="h-[100px] w-[400px] rounded-xl bg-slate-200" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <Skeleton className="h-4 w-[400px] bg-slate-200" />
          <p className="mt-4">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Gestión de Clientes</h1>
      </div>
      <Separator />
      <div className="w-full h-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-2">
        <div className="flex flex-col items-center gap-1">
          <div className="w-full h-full p-2 m-2 flex flex-row justify-center gap-4">
            {visibleForm && (
              <ClientForm
                clientSelected={selectedClient}
                onCloseForm={onCloseForm}
              />
            )}

            <div className="text-left">
              {!visibleForm && (
                <Button className="mb-2" onClick={onOpenForm}>
                  Agregar Cliente
                </Button>
              )}
              {clients.length === 0 ? (
                <Alert variant="destructive">
                  <AlertCircle className="size-5 text-red-500" />
                  <AlertTitle>Atención!</AlertTitle>
                  <AlertDescription>
                    No hay clientes registrados en el sistema, por favor crear un nuevo
                    registro.
                  </AlertDescription>
                </Alert>
              ) : (
                <ClientList />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}