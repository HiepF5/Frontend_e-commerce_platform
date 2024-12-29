import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Slider, Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

interface FilterProps {
  onFilterChange: (filters: any) => void
}

export const ProductFilters = ({ onFilterChange }: FilterProps) => {
  return (
    <Box>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Khoảng giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Slider
            min={0}
            max={10000000}
            step={100000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value.toLocaleString()}đ`}
            onChange={(_, value) => onFilterChange({ priceRange: value })}
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Đánh giá</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup
            onChange={(e) => onFilterChange({ rating: e.target.value })}
          >
            {[5,4,3,2,1].map((rating) => (
              <FormControlLabel
                key={rating}
                value={rating}
                control={<Radio />}
                label={`${rating} sao trở lên`}
              />
            ))}
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Thương hiệu</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {['Brand A', 'Brand B', 'Brand C'].map((brand) => (
            <FormControlLabel
              key={brand}
              control={<Checkbox />}
              label={brand}
              onChange={(_, checked) => 
                onFilterChange({ brands: { [brand]: checked } })
              }
            />
          ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
} 