"use server";
import { revalidatePath } from "next/cache";
import { prismaClient } from "../database/connection";
import { TypePriceService } from "../validation/schema-form-price";

export async function getPrice(code: string) {
  try {
    return await prismaClient.serviceFee.findMany({
      where: {
        code: code
      },
      orderBy: {
        sort: 'asc'
      }
    })
  } catch (error) {
    console.error(error);
    throw new Error('❌ Failed to get price');
  }
}

export async function updatePrice(data: TypePriceService) {
  try {
    await prismaClient.serviceFee.update({
      where: {
        id: data.id,
        code: data.code,
      },
      data: {
        fee: Number(data.fee),
        annual_fee: Number(data.annual_fee),
        is_discount: data.is_discount,
        payment_type: data.payment_type,
      }
    })
    revalidatePath('/admin/price');
  } catch (error) {
    console.error(error);
    throw new Error('❌ Failed to update price');
  }
}