import React, { useState } from 'react';
import { Typography, Grid, IconButton, Box, TextField } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledCalendar = styled('div')({
  padding: '20px',
  textAlign: 'center',
});

const MonthGrid = styled(Grid)({
  marginTop: '20px',
});

const MonthContainer = styled('div')({
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '10px',
  marginBottom: '10px',
});

const DayGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '5px',
  marginTop: '10px',
});

const Day = styled('div')(({ isWeekend, isHoliday }) => ({
  padding: '5px',
  textAlign: 'center',
  border: '1px solid #eee',
  borderRadius: '4px',
  fontSize: '14px',
  minHeight: '20px',
  backgroundColor: isWeekend ? '#ffeb3b' : isHoliday ? '#ff7043' : 'transparent',
}));

const WeekdayHeader = styled('div')({
  padding: '5px',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '14px',
});

const Calendar = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearInput, setYearInput] = useState(year.toString());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Sample holidays for the current year (you can replace this with dynamic data)
  const holidays = [
    { date: new Date(year, 0, 1), name: 'New Year\'s Day' },  // January 1st
    { date: new Date(year, 6, 4), name: 'Independence Day' },  // July 4th
    { date: new Date(year, 11, 25), name: 'Christmas Day' }   // December 25th
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handleYearChange = (event) => {
    setYearInput(event.target.value);

    const newYear = parseInt(event.target.value, 10);
    if (!isNaN(newYear) && newYear >= 1900 && newYear <= 2100) {
      setYear(newYear);
    }
  };

  const handleYearIncrement = () => {
    const newYear = Math.min(year + 1, 2100);
    setYear(newYear);
    setYearInput(newYear.toString());
  };

  const handleYearDecrement = () => {
    const newYear = Math.max(year - 1, 1900);
    setYear(newYear);
    setYearInput(newYear.toString());
  };

  const isHoliday = (date) => {
    return holidays.some(holiday => holiday.date.toDateString() === date.toDateString());
  };

  const renderCalendarMonth = (month) => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDayOfMonth = getFirstDayOfMonth(month, year);

    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<Day key={`empty-${i}`} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const isWeekendDay = currentDate.getDay() === 0 || currentDate.getDay() === 6; // Sunday or Saturday
      const holiday = isHoliday(currentDate);
      days.push(
        <Day key={i} isWeekend={isWeekendDay} isHoliday={holiday}>
          {i}
        </Day>
      );
    }

    return (
      <MonthContainer>
        <Typography variant="h6">{months[month]}</Typography>
        <DayGrid>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <WeekdayHeader key={day}>{day}</WeekdayHeader>
          ))}
          {days}
        </DayGrid>
      </MonthContainer>
    );
  };

  return (
    <StyledCalendar>
      <Typography variant="h4">Calendar</Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px 0' }}>
        <IconButton onClick={handleYearDecrement} aria-label="Previous Year">
          <KeyboardArrowLeft />
        </IconButton>
        <TextField
          label="Year"
          variant="outlined"
          value={yearInput}
          onChange={handleYearChange}
          inputProps={{
            min: 1900,
            max: 2100,
            style: { textAlign: 'center', width: '80px' }
          }}
          sx={{ mx: 2 }}
        />
        <IconButton onClick={handleYearIncrement} aria-label="Next Year">
          <KeyboardArrowRight />
        </IconButton>
      </Box>

      <MonthGrid container spacing={2}>
        {months.map((month, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {renderCalendarMonth(index)}
          </Grid>
        ))}
      </MonthGrid>
    </StyledCalendar>
  );
};

export default Calendar;
