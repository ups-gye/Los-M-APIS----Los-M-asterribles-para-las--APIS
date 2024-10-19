import { Layout } from '@/components/Layout'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { TicketsPlane } from 'lucide-react'

export function Page() {
  return (
    <Layout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Bienvenido</h1>
      </div>
      <Separator />
      <div className="w-full h-full justify-center gap-4 m-5 grid grid-rows-4 lg:grid-rows-1 grid-flow-col">
        
        <Card className="w-[350px] h-[350px] lg:w-[250px] lg:h-[250px]">
          <CardHeader>
            <CardTitle>Reserva un vuelo</CardTitle>
            <CardDescription>
              Sistema de Reserva de vuelos.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-full flex justify-center text-yellow-600">
            <TicketsPlane className="w-20 h-20" />
          </CardContent>
        </Card>
        
      </div>
    </Layout>
  )
}
