import React, { FC, useContext, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import BulkAction from './BulkAction';
import { ContentListContext } from '@/utils/context/ContentListContext';
import { bulkDelete } from '@/utils/axios/contentType';
import { filterExp } from '@/utils/axios/filters';

type Props = {
  total: number,
}

const ListContentBulkActions:FC<Props> = ({ total }) => {

  const { setContent, setCount, content, setLoading, filters, checkedAll } = useContext(ContentListContext);

  const onDelete = async () => {
    setLoading(true);
    const toDelete = content.filter((c) => c.checked);  
    await bulkDelete(toDelete.map((c) => c.id))

    const resp = await filterExp(filters); 

    setContent(resp.data.result);
    setCount(resp.data.count);
    checkedAll?.current?.click();
    setLoading(false);
    
  }


  return (

    <AnimatePresence>
          <motion.div
            initial={{
              height: 0,
              paddingTop: 0,
              paddingBottom: 0
            }}
            animate={{
              height: !total ? 0 : "auto"
            }}
            transition={{ duration: 0.3 }}
            className={`${!total ? "overflow-hidden" : ""} bg-primary rounded-md`}
          >
            
            <div className='flex gap-3 items-center px-3'>
              <span>{ total} seleccionados </span>
              <BulkAction label='Borrar' onClick={onDelete} />
            
            </div>
          </motion.div>
        </AnimatePresence>
  )
}

export default ListContentBulkActions