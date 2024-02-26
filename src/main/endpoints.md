# Endpoints for HTTP

## Autonomy

- /data/gps/rover                                       GET
    returns gps location of ares
    contains empty
- /goal/enqueue                                         POST
    returns empty
    contains goal coordinates + visual marker type
- /goal/abort                                           POST
    returns empty
    contains empty

### Planned

- /data/gps/path                                        GET
    returns: a gps array for paths
    contains: nothing

## Science

- /science/sample                                       GET
    returns: massive spectrograph
    contains empty
- /science/capture/panorama                             GET
    returns: preview image
    contains: empty
- /science/capture/highres                              GET
    returns: preview image
    contains: empty
- /science/archive/select                               POST
    returns: nothing
    contains: archive id

##  Manipulator

- /arm/data/joint_states                                GET
    returns: [j1, j2, j3, j4, j5] angle poses in deg
    contains: nothing

### Planned

- /arm/data/ak60
    returns: {
        "temperature": [t1, t2, t3, t4]
        "velocities": [v1, v2, v3, v4],
        "currents": [c1, c2, c3, c4]
    }


