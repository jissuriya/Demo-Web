import { NextResponse } from 'next/server'
export async function POST(request: Request) {
 const origin=request.headers.get('origin')
 const host=request.headers.get('x-forwarded-host')?.split(',')[0].trim() || request.headers.get('host')
 const protocol=request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || new URL(request.url).protocol.slice(0,-1)
 const publicOrigin=host ? `${protocol}://${host}` : new URL(request.url).origin
 if(origin && origin!==publicOrigin && origin!==new URL(request.url).origin)return NextResponse.json({error:'Request origin not allowed.'},{status:403})
 if(!request.headers.get('content-type')?.includes('application/json'))return NextResponse.json({error:'JSON required.'},{status:415})
 try {
  const reader=request.body?.getReader();if(!reader)return NextResponse.json({error:'Missing inquiry.'},{status:400})
  let size=0;const chunks:Uint8Array[]=[]
  while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>16000){await reader.cancel();return NextResponse.json({error:'Inquiry is too large.'},{status:413})}chunks.push(value)}
  const data=JSON.parse(Buffer.concat(chunks).toString('utf8'))
  if(!data||typeof data!=='object'||Array.isArray(data))return NextResponse.json({error:'Invalid inquiry.'},{status:400})
  if(data.website)return NextResponse.json({error:'Unable to process this request.'},{status:400})
  const validText=(value:unknown,min:number,max:number)=>typeof value==='string'&&value.trim().length>=min&&value.length<=max
  if(!validText(data.name,2,100)||!validText(data.email,3,254)||!/^\S+@\S+\.\S+$/.test(data.email)||!validText(data.message,10,5000)||!validText(data.interest,1,150)||!validText(data.phone??'',0,30))return NextResponse.json({error:'Please check your name, email, interest, and message (at least 10 characters).'},{status:400})
  return NextResponse.json({validated:true,sent:false,stored:false},{headers:{'Cache-Control':'no-store'}})
 }catch{return NextResponse.json({error:'Please provide a valid inquiry.'},{status:400})}
}
