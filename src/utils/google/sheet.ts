import { google } from 'googleapis'

import { AirInfo } from '@/types/table'

const SHEET_NAME = 'Notam'

const normalizeRow = (array: string[]) => {
  if (!Array.isArray(array) || array.length < 9) {
    throw new Error('Invalid input array format')
  }

  return {
    id: array[0],
    firstScrapeDate: array[1],
    lastScrapeDate: array[2],
    location: array[3],
    number: array[4],
    class: array[5],
    startDate: array[6],
    endDate: array[7] || null,
    condition: array[8]
  } as AirInfo
}

export const getSheetData = async (offset = 0, limit = 100) => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  const sheets = google.sheets({ version: 'v4', auth })

  try {
    const countRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: `${SHEET_NAME}!A:A`
    })

    const allRows = countRes.data.values || []
    const realRowCount = allRows.length - 1 // minus header row

    // Calculate row positions from the bottom instead of the top
    const endRow = realRowCount + 1 - offset // +1 because we're starting after the header
    const startRow = Math.max(2, endRow - limit + 1) // Ensure we don't go before the header (row 1)

    const range = `${SHEET_NAME}!A${startRow}:Z${endRow}`

    const valuesRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range
    })

    const values = valuesRes.data.values || []

    // Further reverse the array to ensure newest rows come first
    const reversedValues = [...values].reverse()

    return {
      data: reversedValues.map(normalizeRow),
      total: realRowCount
    }
  } catch (error) {
    console.error('Error fetching sheet data:', error)
    return {
      data: [],
      total: 0
    }
  }
}
