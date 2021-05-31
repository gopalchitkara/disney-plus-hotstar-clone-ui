import React, { Fragment } from 'react'
import ContentTray from '../trayAndCards/ContentTray'
import useFetch from '../../customHooks/useFetch'
import { TraysContainer } from '../common/sharedCardTrayStyles'

function ContentTrays() {
    const { data: trayData, isPending, error } = useFetch('/api/home-page-trays')

    return (
        <TraysContainer>
            {isPending ? (<></>) : (
                <Fragment>
                    {trayData && trayData.trays && trayData.trays.length > 0 && error === null ? (
                        <Fragment>
                            {trayData.trays.map(tray => {
                                return (
                                    <div key={Math.random() * 100}>
                                        <ContentTray trayDetail={tray} />
                                    </div>
                                )
                            })}
                        </Fragment>
                    ) : (
                        <h3>oops! Something went wrong...</h3>
                    )}
                </Fragment>
            )}
        </TraysContainer>
    )
}

export default ContentTrays

