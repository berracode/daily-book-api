import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ProductFacadeService } from '../facade/product.facade.service';
import { StandardResponse } from '../../utils/http-response/standard-response';
import { ProductFullDto } from '../dto/product-full.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from '../dto/product.dto';
import { MESSAGES_RESPONSE } from '../../utils/enums/messages-response.enum';
import { ProductDetailDto } from '../dto/product-detail.dto';

@ApiTags('Products')
@Controller('api/product')
export class ProductController {
  constructor(private readonly facade: ProductFacadeService) {}

  @Get('/filter')
  @ApiResponse({ status: 200, description: 'Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    description: 'List of products',
    type: ProductDto,
  })
  public async findFiltered(@Query() query): Promise<StandardResponse<any[]>> {
    return {
      status: HttpStatus.OK,
      body: await this.facade.findProductsFilter(query['code'], query['name'], query['company'])
    };
  }

  @Get('/by-id/:id')
  @ApiResponse({ status: 200, description: 'Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  public async find(@Param('id') id: number): Promise<StandardResponse<ProductFullDto>> {
    return {
      status: HttpStatus.OK,
      body: await this.facade.find(id)
    };
  }

  @Post()
  @ApiResponse({ status: 200, description: 'Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    description: 'Product created',
    type: ProductDetailDto,
  })
  public async saveProductsFull(@Body() productDetailDto: ProductDetailDto): Promise<StandardResponse<any>> {
    return {
      status: HttpStatus.OK,
      message: MESSAGES_RESPONSE.CREATED,
      body: await this.facade.saveProductFull(productDetailDto)
    };
  }

  @Put()
  @ApiResponse({ status: 200, description: 'Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
    description: 'Product updated',
    type: ProductDetailDto,
  })
  public async editProductsFull(@Body() productDetailDto: ProductDetailDto): Promise<StandardResponse<any>> {
    return {
      status: HttpStatus.OK,
      message: MESSAGES_RESPONSE.UPDATED,
      body: await this.facade.editProductFull(productDetailDto)
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Successful.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  public async deleteProductDetails(@Param('id') id: number): Promise<StandardResponse<any>> {
    return {
      status: HttpStatus.OK,
      message: MESSAGES_RESPONSE.DELETED,
      body: await this.facade.deleteProductDetails(id)
    };
  }
}
