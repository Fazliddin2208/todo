import { faDownload, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className='header'>
      <Link to="/">
        <h2>
          ToDo
        </h2>
      </Link>
      <div className="header__actions">
        <button>Import <FontAwesomeIcon icon={faDownload} /> </button>
        <button>Export <FontAwesomeIcon icon={faUpload} /></button>
      </div>
    </div>
  )
}
