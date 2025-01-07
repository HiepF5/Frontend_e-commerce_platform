import  { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,

  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,

  IconButton,
  
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import { useListProductOfShopMutation } from '@features/Products/api/productApi'

const ShopProducts = (): JSX.Element => {
  const [open, setOpen] = useState(false)
  const [isEdit] = useState(false)
  // const [products, setProducts] = useState<any[]>([])
  const user = JSON.parse(localStorage.getItem('user') || '{}')
    const [listProductOfShop, { data }] =
      useListProductOfShopMutation()
 useEffect(() => {
    listProductOfShop({
      shopId: user.shop_code || '',
      pageNumber: 1,
      pageSize: 40
    })
  }, [])
  // State for form data
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [currency, setCurrency] = useState('')
  const [categoryId, setCategoryId] = useState(38)
  const [brandId, setBrandId] = useState(4)
  const [shopCategoryIds, setShopCategoryIds] = useState([5, 4])
  const [variantDTOS, setVariantDTOS] = useState([
    {
      price: 0,
      quantity: 0,
      sku: '',
      stockQuantity: 0,
      attributeDTOList: [
        { name: 'Size', value: '128GB' },
        { name: 'Color', value: 'Red' }
      ]
    }
  ])
console.log(variantDTOS)
  // Hàm tạo hoán vị
  const generatePermutations = (attributes: Record<string, string[]>) => {
    const keys = Object.keys(attributes)
    const cartesianProduct = (arr: string[][]) => {
      return arr.reduce(
        (acc, curr) => acc.flatMap((x) => curr.map((y) => [...x, y])),
        [[] as string[]]
      )
    }

    const values = keys.map((key) => attributes[key])
    const combinations = cartesianProduct(values)

    return combinations.map((combination) =>
      combination.reduce(
        (acc: Record<string, string>, value, index) => ({
          ...acc,
          [keys[index]]: value
        }),
        {} as Record<string, string>
      )
    )
  }

  // Hàm thêm biến thể
  const addVariant = () => {
    setVariantDTOS((prev) => [
      ...prev,
      {
        price: 0,
        quantity: 0,
        sku: '',
        stockQuantity: 0,
        attributeDTOList: []
      }
    ])
  }

  // Hàm thay đổi thuộc tính của biến thể
  // const handleVariantChange = (
  //   index: number,
  //   field: keyof typeof variantDTOS[number],
  //   value: any
  // ) => {
  //   const newVariants = [...variantDTOS]
  //   newVariants[index] = {
  //     ...newVariants[index],
  //     [field]: value
  //   }
  //   setVariantDTOS(newVariants)
  // }
  // const addAttribute = (index: number) => {
  //   const updatedVariants = [...variantDTOS]
  //   updatedVariants[index].attributeDTOList.push({ name: '', value: '' })
  //   setVariantDTOS(updatedVariants)
  // }

  // // Hàm thay đổi giá trị thuộc tính
  // const handleAttributeChange = (
  //   variantIndex: number,
  //   attributeIndex: number,
  //   field: 'name' | 'value',
  //   value: string
  // ) => {
  //   const newVariants = [...variantDTOS]
  //   newVariants[variantIndex].attributeDTOList[attributeIndex][field] = value
  //   setVariantDTOS(newVariants)
  // }

  // Hàm để tính toán hoán vị mới khi người dùng thay đổi thuộc tính
  const handleGenerateVariants = () => {
    // Tạo đối tượng thuộc tính
    const attributes = {
      memory: ['128GB', '256GB'],
      color: ['Red', 'Green']
    }

    const newVariants = generatePermutations(attributes)

    // Cập nhật state với các biến thể mới
    setVariantDTOS(
      newVariants.map((variant) => ({
        price: 0,
        quantity: 0,
        sku: '',
        stockQuantity: 0,
        attributeDTOList: Object.keys(variant).map((key) => ({
          name: key,
          value: variant[key]
        }))
      }))
    )
  }

  return (
    <Box>
      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
      >
        Add Product
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.data.map((product: any) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: 50, height: 50, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.productTitle}</TableCell>
                <TableCell>{product.minPrice}VNĐ</TableCell>
                <TableCell>{product.soldCount}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <IconButton size='small'>
                    <EditIcon />
                  </IconButton>
                  <IconButton size='small' color='error'>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Description'
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label='Currency'
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={categoryId}
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                >

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Brand</InputLabel>
                <Select
                  value={brandId}
                  onChange={(e) => setBrandId(Number(e.target.value))}
                >

                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Shop Categories</InputLabel>
                <Select
                  multiple
                  value={shopCategoryIds}
                  onChange={(e) =>
                    setShopCategoryIds(e.target.value as number[])
                  }
                >
                </Select>
              </FormControl>
            </Grid>

                

            {/* Nút thêm thuộc tính cho biến thể */}
            <Grid item xs={12}>
              <Button variant='outlined' onClick={() => addVariant()}>
                Add Variant
              </Button>
            </Grid>
          </Grid>
        

        {/* Nút để tạo các hoán vị tự động */}
        <Grid item xs={12}>
          <Button variant='outlined' onClick={handleGenerateVariants}>
            Generate Variants
          </Button>
        </Grid>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant='contained'>
        Save
      </Button>
    </DialogActions>
  </Dialog>
</Box>
  )
}

export default ShopProducts
